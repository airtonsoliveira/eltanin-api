import { InvoiceRepo } from '../model/InvoiceRepo'
import { UseCase } from "@shared/UseCase";

export default class GetInvoiceUseCase implements UseCase<any, any> {
    constructor(private invoiceRepo: InvoiceRepo) {}

    async execute (): Promise<any> {
        const result = await this.invoiceRepo.getAll('1')

        return result.map((invoice: any) => {
            return {
                id: invoice.id_usuario,
                referenceMonth: invoice.nu_mes_referencia,
                dueDate: invoice.dt_vencimento,
                issueDate: invoice.dt_emissao,
                value: invoice.nu_valor,
                storedFile: invoice.tx_arquivo_armazenado,
                userId: invoice.id_usuario,
                distributorId: invoice.id_distribuidora,
                unitId: invoice.id_unidade
            }
        })
    }
}