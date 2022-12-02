import GetCritiqueEvaluateService from "../service/GetCritiqueEvaluateService";
import { UseCase } from "@shared/UseCase";
import { Result } from '@shared/Result';
import { invoiceRepo } from "@modules/invoice/model";
import { InvoiceMapper } from "@modules/invoice/model/InvoiceMapper";

export default class GetCritiqueEvaluateUseCase implements UseCase<any, any> {
    constructor(private getCritiqueEvaluateService: GetCritiqueEvaluateService) { }

    async execute(req: { idInvoice: string, idUser: string }): Promise<any> {
        try {
            const invoicesResult = await invoiceRepo.getById(req.idInvoice, req.idUser)
            const invoice = InvoiceMapper.toDomain(invoicesResult[0]).getValue()
            const result = await this.getCritiqueEvaluateService.execute(invoice)

            return result
        } catch (error: any) {
            return Result.fail(error.message).errorValue()
        }
    }
}