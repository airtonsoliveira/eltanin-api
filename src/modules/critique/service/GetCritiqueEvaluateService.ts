import { Invoice } from "@modules/invoice/model/Invoice";
import { IDbContext } from "@shared/database/DbContext";

export default class GetCritiqueEvaluateService {
    private dbContext: IDbContext

    private status = {
        validated: 0,
        divergent: 1,
        notEvaluated: 2
    }

    constructor(dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async execute(invoice: Invoice): Promise<any> {
        const critiqueQuery = `SELECT * FROM eltanin.critica` 

        await this.dbContext.query(critiqueQuery)

        const aggregate = {
            consumed: Number(this.consumed(invoice.items)),
            injected: Number(this.injected(invoice.items)),
            compensed: Number(this.compensed(invoice.items)),
            credits: Number(this.credits(invoice.items)),
            previousCredits: 0
        }

        const result = [
            {
                id: 1,
                name: 'Energia compensada deveria existir',
                law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso II',
                status: this.evalCritique1(aggregate)
            },
            {
                id: 2,
                name: 'Energia compensada com valor maior que energia consumida',
                law: 'RN Nº 687 24/11/2015 - Artigo 2º - inciso III',
                status: this.evalCritique2(aggregate)
            },
            {
                id: 3,
                name: 'Há energia compensada, porém consumo é zero',
                law: 'Não há exatamente uma lei que rege este tópico, porém trata-se de um erro, uma vez que compensa-se apenas o que se consome. A energia injetada na rede refere-se como “injetada” ou até rateada',
                status: this.evalCritique3(aggregate)
            },
            {
                id: 4,
                name: 'Injeção maior que consumo, porém o saldo de créditos não aumentou',
                law: 'RN Nº 687 24/11/2015 - Artigo 7º - incisos IX, X, XII',
                status: this.evalCritique4(aggregate)
            },
            {
                id: 5,
                name: 'Injeção menor que consumo, porém saldo de créditos não diminuiu ou era zero',
                law: 'RN Nº 687 24/11/2015 - Artigo 7º - incisos IX, X, XII',
                status: this.evalCritique5(aggregate)
            },
            {
                id: 6,
                name: 'Energia injetada diverge de delta saldo menos energia compensada em mais de 5% ou 100 kWh',
                law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso III, IV',
                status: this.evalCritique6(aggregate)
            },
            {
                id: 7,
                name: 'Saldo após compensação incorreto',
                law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso III',
                status: this.evalCritique7(aggregate)
            },
            {
                id: 8,
                name: 'Energia consumida parcialmente compensada',
                law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso III',
                status: this.evalCritique8(aggregate)
            },
            {
                id: 9,
                name: 'Energia consumida não compensada, apesar de injeção ou créditos',
                law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso III',
                status: this.evalCritique9(aggregate)
            },
        ]

        return result
    }

    evalCritique1(aggregate: any) {
        const consumed = aggregate.consumed

        if([consumed].some(value => Number.isNaN(value))) {
            return this.status.divergent
        }
        return this.status.validated
    }

    evalCritique2(aggregate: any) {
        const compensed = aggregate.compensed
        const consumed = aggregate.consumed

        if([compensed, consumed].some(value => Number.isNaN(value))) {
            return this.status.notEvaluated
        }
        if(compensed > 0 && consumed == 0) {
            return this.status.divergent
        }
        return this.status.validated
    }

    evalCritique3(aggregate: any) {
        const compensed = aggregate.compensed
        const consumed = aggregate.consumed

        if([compensed, consumed].some(value => Number.isNaN(value))) {
            return this.status.notEvaluated
        }
        if(compensed > consumed) {
            return this.status.divergent
        }
        return this.status.validated
    }

    evalCritique4(aggregate: any) {
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected

        if(injected <= consumed || [previousCredits, credits, consumed, injected].some(value => Number.isNaN(value))) {
            return this.status.notEvaluated
        }
        if(previousCredits >= credits) {
            return this.status.divergent
        }
        return this.status.validated
    }

    evalCritique5(aggregate: any) {
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected

        if(injected >= consumed || [previousCredits, credits, consumed, injected].some(value => Number.isNaN(value))) {
            return this.status.notEvaluated
        }
        if(previousCredits <= credits || previousCredits === 0) {
            return this.status.divergent
        }
        return this.status.validated
    }

    evalCritique6(aggregate: any) {
        return this.status.notEvaluated
    }

    evalCritique7(aggregate: any) {
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected

        if([previousCredits, credits, consumed, injected].some(value => Number.isNaN(value))) {
            return this.status.notEvaluated
        }
        let newCredits = previousCredits + injected - consumed
        if(newCredits < 0) {
            newCredits = 0
        }
        if(newCredits !== credits) {
            return this.status.divergent
        }
        return this.status.validated
    }

    evalCritique8(aggregate: any) {
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected
        const compensed = aggregate.compensed

        if([previousCredits, credits, consumed, injected, compensed].some(value => Number.isNaN(value))) {
            return this.status.notEvaluated
        }
        let calculatedCompensed
        if(consumed - injected > 0) {
            if (previousCredits) {
                calculatedCompensed = consumed - injected - previousCredits > 0 ? injected + previousCredits : consumed
            } else {
                calculatedCompensed = injected
            }
        } else {
            calculatedCompensed = consumed
        }
        if(calculatedCompensed !== compensed) {
            return this.status.divergent
        }
        return this.status.validated
    }

    evalCritique9(aggregate: any) {
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected
        const compensed = aggregate.compensed

        if([previousCredits, credits, consumed, injected].some(value => Number.isNaN(value))) {
            return this.status.notEvaluated
        }
        if([previousCredits, injected].some(value => value > 0) && consumed > 0 && (compensed === 0 || Number.isNaN(compensed))) {
            return this.status.divergent
        }
        return this.status.validated
    }

    consumed (items: any[]) {
        const itemsConsumed = items.filter((item: any) => { [26, 21, 87, 104, 79, 80].includes(item.type) })

        if (itemsConsumed.length = 0) return NaN

        let sumConsumed = 0
        itemsConsumed.forEach((item: any) => {
            sumConsumed += item.value
        })

        return sumConsumed
    }

    injected (items: any[]) {
        const itemsInjected = items.filter((item: any) => { [27, 125, 72, 73].includes(item.type) })

        if (itemsInjected.length = 0) return NaN

        let sumInjected = 0
        itemsInjected.forEach((item: any) => {
            sumInjected += item.value
        })

        return sumInjected
    }

    compensed (items: any[]) {
        const itemsCompensed = items.filter((item: any) => { [128, 129, 89, 90, 25, 39, 120, 83, 84].includes(item.type) })

        if (itemsCompensed.length = 0) return NaN

        let sumCompensed = 0
        itemsCompensed.forEach((item: any) => {
            sumCompensed += item.value
        })

        return sumCompensed
    }

    credits (items: any[]) {
        const itemsCredits = items.filter((item: any) => { [22, 23].includes(item.type) })

        if (itemsCredits.length = 0) return NaN

        let sumCredits = 0
        itemsCredits.forEach((item: any) => {
            sumCredits += item.value
        })

        return sumCredits
    }
}