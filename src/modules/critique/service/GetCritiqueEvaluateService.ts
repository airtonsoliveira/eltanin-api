import { getInvoiceByFilterService } from "@modules/invoice/service";
import { Invoice } from "@modules/invoice/model/Invoice";
import { InvoiceMapper } from "@modules/invoice/model/InvoiceMapper";
import { IDbContext } from "@shared/database/DbContext";
import util_date from "@shared/util/anomes"

export default class GetCritiqueEvaluateService {
    private dbContext: IDbContext

    private status = {
        validated: 0,
        divergent: 1,
        notEvaluated: 2
    }

    private results = [
        {
            id: 1,
            errorMessage: 'Energia compensada deveria existir',
            successMessage: 'Energia compensada existe',
            law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso II',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 2,
            errorMessage: 'Energia compensada com valor maior que energia consumida',
            successMessage: 'Energia compensada com valor menor ou igual à energia consumida',
            law: 'RN Nº 687 24/11/2015 - Artigo 2º - inciso III',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 3,
            errorMessage: 'Há energia compensada, porém consumo é zero',
            successMessage: 'Há energia compensada, porém consumo é maior que zero',
            law: 'Não há exatamente uma lei que rege este tópico, porém trata-se de um erro, uma vez que compensa-se apenas o que se consome. A energia injetada na rede refere-se como “injetada” ou até rateada',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 4,
            errorMessage: 'Injeção maior que consumo, porém o saldo de créditos não aumentou',
            successMessage: 'Injeção maior que consumo e o saldo de créditos aumentou',
            law: 'RN Nº 687 24/11/2015 - Artigo 7º - incisos IX, X, XII',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 5,
            errorMessage: 'Injeção menor que consumo, porém saldo de créditos não diminuiu',
            successMessage: 'Injeção menor que consumo e saldo de créditos diminuiu ou era zero',
            law: 'RN Nº 687 24/11/2015 - Artigo 7º - incisos IX, X, XII',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 6,
            errorMessage: 'Energia injetada diverge de delta saldo menos energia compensada em mais de 5% ou 100 kWh',
            successMessage: 'Energia injetada não diverge de delta saldo menos energia compensada em mais de 5% ou 100 kWh',
            law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso III, IV',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 7,
            errorMessage: 'Saldo após compensação incorreto',
            successMessage: 'Saldo após compensação correto',
            law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso III',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 8,
            errorMessage: 'Energia consumida parcialmente compensada',
            successMessage: 'Energia consumida devidamente compensada',
            law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso III',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 9,
            errorMessage: 'Energia consumida não compensada, apesar de injeção ou créditos',
            successMessage: 'Energia consumida compensada com injeção e/ou créditos',
            law: 'RN Nº 687 24/11/2015 - Artigo 7º - inciso III',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 10,
            errorMessage: '',
            successMessage: '',
            law: '',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 11,
            errorMessage: '',
            successMessage: '',
            law: '',
            status: 2,
            expected: '',
            calculed: ''
        },
        {
            id: 12,
            errorMessage: '',
            successMessage: '',
            law: '',
            status: 2,
            expected: '',
            calculed: ''
        },
    ]

    constructor(dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async execute(invoice: Invoice): Promise<any> {
        const previousInvoiceParams: any = {
            referenceMonth: util_date.get_anomes_from_interval(Number(invoice.referenceMonth), -1),
            unitId: invoice.unitId
        }

        const previousInvoiceResult = await getInvoiceByFilterService.execute(invoice.userId, previousInvoiceParams)
        const previousInvoice = InvoiceMapper.toDomain(previousInvoiceResult[0]).getValue()

        const aggregate = {
            consumed: this.consumed(invoice.items),
            injected: this.injected(invoice.items),
            compensed: this.compensed(invoice.items),
            credits: this.credits(invoice.items),
            previousCredits: this.credits(previousInvoice.items)
        }

        this.evalCritique1(aggregate)
        this.evalCritique2(aggregate)
        this.evalCritique3(aggregate)
        this.evalCritique4(aggregate)
        this.evalCritique5(aggregate)
        this.evalCritique6(aggregate)
        this.evalCritique7(aggregate)
        this.evalCritique8(aggregate)
        this.evalCritique9(aggregate)
        this.evalCritique10(aggregate)
        this.evalCritique11(aggregate)
        this.evalCritique12(aggregate)

        return this.results
    }

    evalCritique1(aggregate: any) {
        const name = 'Energia compensada existe'
        const consumed = aggregate.consumed

        this.results[0].expected = 'Maior que 0'
        this.results[0].calculed = consumed

        if([consumed].some(value => Number.isNaN(value))) {
            this.results[0].status = this.status.divergent
            return
        }
        if(consumed <= 0) {
            this.results[0].status = this.status.divergent
            return
        }
        this.results[0].status = this.status.validated
    }

    evalCritique2(aggregate: any) {
        const name = 'Energia compensada com valor menor ou igual à energia consumida'
        const compensed = aggregate.compensed
        const consumed = aggregate.consumed

        if([compensed, consumed].some(value => Number.isNaN(value))) {
            this.results[1].status = this.status.notEvaluated
            return
        }

        this.results[1].expected = `Menor ou igual a ${consumed}`
        this.results[1].calculed = compensed

        if(compensed > 0 && consumed == 0) {
            this.results[1].status = this.status.divergent
            return
        }
        this.results[1].status = this.status.validated
    }

    evalCritique3(aggregate: any) {
        const name = 'Há energia compensada, porém consumo é maior que zero'
        const compensed = aggregate.compensed
        const consumed = aggregate.consumed

        if([compensed, consumed].some(value => Number.isNaN(value))) {
            this.results[2].status = this.status.notEvaluated
            return
        }

        if(compensed <= 0) {
            this.results[2].status = this.status.notEvaluated
            return
        }

        this.results[2].expected = 'Maior que 0'
        this.results[2].calculed = consumed

        if(compensed > consumed) {
            this.results[2].status = this.status.divergent
            return
        }
        this.results[2].status = this.status.validated
    }

    evalCritique4(aggregate: any) {
        const name = 'Injeção maior que consumo e o saldo de créditos aumentou'
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected

        if(injected <= consumed || [previousCredits, credits, consumed, injected].some(value => Number.isNaN(value))) {
            this.results[3].status = this.status.notEvaluated
            return
        }

        this.results[3].expected = `Maior que ${previousCredits}`
        this.results[3].calculed = credits

        if(previousCredits >= credits) {
            this.results[3].status = this.status.divergent
            return
        }
        this.results[3].status = this.status.validated
    }

    evalCritique5(aggregate: any) {
        const name = 'Injeção menor que consumo e saldo de créditos diminuiu ou era zero'
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected

        if(injected >= consumed || [previousCredits, credits, consumed, injected].some(value => Number.isNaN(value))) {
            this.results[4].status = this.status.notEvaluated
            return
        }

        this.results[4].expected = `Menor que ${previousCredits}`
        this.results[4].calculed = credits

        if(previousCredits <= credits && previousCredits !== 0) {
            this.results[4].status = this.status.divergent
            return
        }
        this.results[4].status = this.status.validated
    }

    evalCritique6(aggregate: any) {
        const name = 'Energia injetada não diverge de delta saldo menos energia compensada em mais de 5% ou 100 kWh'
        this.results[5].status = this.status.notEvaluated
    }

    evalCritique7(aggregate: any) {
        const name = 'Saldo após compensação correto'
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected

        if([previousCredits, credits, consumed, injected].some(value => Number.isNaN(value))) {
            this.results[6].status = this.status.notEvaluated
            return
        }
        let newCredits: any = previousCredits + injected - consumed
        if(newCredits < 0) {
            newCredits = 0
        }

        this.results[6].expected = newCredits
        this.results[6].calculed = credits

        if(newCredits !== credits) {
            this.results[6].status = this.status.divergent
            return
        }
        this.results[6].status = this.status.validated
    }

    evalCritique8(aggregate: any) {
        const name = 'Energia consumida devidamente compensada'
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected
        const compensed = aggregate.compensed

        if([previousCredits, credits, consumed, injected, compensed].some(value => Number.isNaN(value))) {
            this.results[7].status = this.status.notEvaluated
            return
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

        this.results[7].expected = calculatedCompensed
        this.results[7].calculed = compensed

        if(calculatedCompensed !== compensed) {
            this.results[7].status = this.status.divergent
            return
        }
        this.results[7].status = this.status.validated
    }

    evalCritique9(aggregate: any) {
        const name = 'Energia consumida compensada com injeção e/ou créditos'
        const previousCredits = aggregate.previousCredits
        const credits = aggregate.credits
        const consumed = aggregate.consumed
        const injected = aggregate.injected
        const compensed = aggregate.compensed

        if([previousCredits, credits, consumed, injected].some(value => Number.isNaN(value))) {
            this.results[8].status = this.status.notEvaluated
            return
        }

        this.results[8].expected = 'Maior que 0'
        this.results[8].calculed = consumed

        if([previousCredits, injected].some(value => value > 0) && consumed > 0 && (compensed === 0 || Number.isNaN(compensed))) {
            this.results[8].status = this.status.divergent
            return
        }
        this.results[8].status = this.status.validated
    }

    evalCritique10(aggregate: any) {
        const name = 'Não existe fatura do mês anterior'
        const previousCredits = aggregate.previousCredits

        if([previousCredits].some(value => Number.isNaN(value))) {
            this.results[9].status = this.status.divergent
            return
        }

        this.results[9].status = this.status.validated
    }

    evalCritique11(aggregate: any) {
        const name = 'Há consumo ou compensação, mas não há tarifa'
        const consumed = aggregate.consumed
        const compensed = aggregate.compensed

        if([consumed, compensed].some(value => Number.isNaN(value))) {
            this.results[10].status = this.status.notEvaluated
            return
        }

        if(consumed <= 0 && compensed <= 0) {
            this.results[10].status = this.status.notEvaluated
            return
        }

        this.results[10].status = this.status.notEvaluated
        return
    }

    evalCritique12(aggregate: any) {
        const name = 'Não há cobrança de consumo ou custo de disponibilidade'
        this.results[11].status = this.status.notEvaluated
        return
    }

    consumed (items: any[]) {
        const itemsConsumed = items.filter((item: any) => [26, 21, 87, 104, 79, 80].includes(item.id_tipo_item_fatura))

        if (itemsConsumed.length === 0) { return NaN }

        let sumConsumed = 0
        itemsConsumed.forEach((item: any) => {
            sumConsumed += Number(item.valor)
        })

        return sumConsumed
    }

    injected (items: any[]) {
        const itemsInjected = items.filter((item: any) => [38, 37, 122].includes(item.id_tipo_item_fatura))

        if (itemsInjected.length === 0) return NaN

        let sumInjected = 0
        itemsInjected.forEach((item: any) => {
            sumInjected += Number(item.valor)
        })

        return sumInjected
    }

    compensed (items: any[]) {
        const itemsCompensed = items.filter((item: any) => [128, 129, 89, 90, 25, 39, 120, 83, 84].includes(item.id_tipo_item_fatura))

        if (itemsCompensed.length === 0) return NaN

        let sumCompensed = 0
        itemsCompensed.forEach((item: any) => {
            sumCompensed += Number(item.valor)
        })

        return sumCompensed
    }

    credits (items: any[]) {
        const itemsCredits = items.filter((item: any) => [22, 23].includes(item.id_tipo_item_fatura))

        if (itemsCredits.length === 0) return NaN

        let sumCredits = 0
        itemsCredits.forEach((item: any) => {
            sumCredits += Number(item.valor)
        })

        return sumCredits
    }
}