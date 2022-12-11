import { InvoiceRepo } from '../model/InvoiceRepo'
import { UseCase } from "@shared/UseCase";

export default class GetInvoiceByIdUseCase implements UseCase<any, any> {
    constructor(private invoiceRepo: InvoiceRepo) {}

    async execute (req: { idInvoice: string, idUser: string }): Promise<any> {
        const result = await this.invoiceRepo.getById(req.idInvoice, req.idUser)

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
            if([37, 38].includes(item.id_tipo_item_fatura)) injected += parseFloat(item.valor)
        })
        return parseFloat(injected.toFixed(2))
    }

    getConsumedTotal(itens_fatura: any) {
        let consumed = 0
        itens_fatura.forEach((item: any) => {
            if([21, 87].includes(item.id_tipo_item_fatura)) consumed += parseFloat(item.valor)
        })
        return parseFloat(consumed.toFixed(2))
    }
}