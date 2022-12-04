import { getInvoiceByFilterService } from '../service';
import { InvoiceRepo } from '../model/InvoiceRepo'
import { UseCase } from "@shared/UseCase";

export default class GetInvoiceUseCase implements UseCase<any, any> {
    constructor(private invoiceRepo: InvoiceRepo) {}

    async execute (params: { idUser: string, filters?: any }): Promise<any> {
        let result
        if (params.filters) {
            result = await getInvoiceByFilterService.execute(params.idUser, params.filters)
        } else {
            result = await this.invoiceRepo.getAll(params.idUser)
        }

        return result.map((invoice: any) => {
            return {
                id: invoice.id_fatura,
                referenceMonth: invoice.nu_mes_referencia,
                dueDate: invoice.dt_vencimento,
                issueDate: invoice.dt_emissao,
                value: invoice.nu_valor,
                storedFile: invoice.tx_arquivo_armazenado,
                userId: invoice.id_usuario,
                distributorId: invoice.id_distribuidora,
                unitId: invoice.id_unidade,
                items: invoice.itens_fatura?.map((item: any) => {
                    return {
                        name: item.nome,
                        type: item.id_tipo_item_fatura,
                        value: item.valor
                    }
                }),
                injected: this.getInjectedTotal(invoice.itens_fatura),
                consumed: this.getConsumedTotal(invoice.itens_fatura)
            }
        })
    }

    getInjectedTotal(itens_fatura: any) {
        let injected = 0
        itens_fatura.forEach((item: any) => {
            if([37, 38].includes(item.id_tipo_item_fatura)) injected += parseFloat(item.valor.replace('.', '').replace(',', '.'))
        })
        return parseFloat(injected.toFixed(2))
    }

    getConsumedTotal(itens_fatura: any) {
        let consumed = 0
        itens_fatura.forEach((item: any) => {
            if([21, 87].includes(item.id_tipo_item_fatura)) consumed += parseFloat(item.valor.replace('.', '').replace(',', '.'))
        })
        return parseFloat(consumed.toFixed(2))
    }
}