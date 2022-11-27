import { InvoiceRepo } from '../model/InvoiceRepo'
import { UseCase } from "@shared/UseCase";
import { InvoiceMapper } from '../model/InvoiceMapper';
import fs from 'fs'

export default class GetInvoiceByIdUseCase implements UseCase<any, any> {
    constructor(private invoiceRepo: InvoiceRepo) {}

    async execute (invoiceToInsert: any): Promise<any> {
        const invoice = InvoiceMapper.toDomain(invoiceToInsert).getValue()
        const result = await this.invoiceRepo.save(invoice)

        if(invoiceToInsert.file) fs.writeFileSync('C:\\Users\\ton02\\OneDrive\\Documentos\\pasf\\pasf-api\\upload\\text.pdf', invoiceToInsert.file, 'binary')

        return result
    }
}