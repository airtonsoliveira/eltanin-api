import { InvoiceRepo } from '../model/InvoiceRepo'
import { UseCase } from "@shared/UseCase";

export default class DelInvoiceByIdUseCase implements UseCase<any, any> {
    constructor(private invoiceRepo: InvoiceRepo) {}

    async execute (req: { idInvoice: string, idUser: string }): Promise<any> {
        const result = await this.invoiceRepo.delete(req.idInvoice, req.idUser)

        return result
    }
}