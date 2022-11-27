import { InvoiceRepo } from '../model/InvoiceRepo'
import { UseCase } from "@shared/UseCase";
import { InvoiceMapper } from '../model/InvoiceMapper';
import fs from 'fs'

export default class PutInvoiceByIdUseCase implements UseCase<any, any> {
    constructor(private invoiceRepo: InvoiceRepo) {}

    async execute (invoiceToUpdate: any): Promise<any> {
        const invoice = InvoiceMapper.toDomain(invoiceToUpdate).getValue()
        const result = await this.invoiceRepo.save(invoice)
        
        if(invoiceToUpdate.file) fs.writeFileSync('C:\\Users\\ton02\\OneDrive\\Documentos\\pasf\\pasf-api\\upload\\text.pdf', invoiceToUpdate.file, 'binary')

        return result
    }
}