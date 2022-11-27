import GetInvoiceItemTypeService from "../service/GetInvoiceItemTypeService";
import { UseCase } from "@shared/UseCase";
import { Result } from '@shared/Result';

export default class GetInvoiceItemTypeUseCase implements UseCase<any, any> {
    constructor(private getInvoiceItemTypeService: GetInvoiceItemTypeService) { }

    async execute(): Promise<any> {
        try {
            const result = await this.getInvoiceItemTypeService.execute()

            return result.map((itemType: any) => {
                return {
                    id: itemType.id_tipo_item_fatura,
                    name: itemType.nome,
                    code: itemType.codigo,
                    valueType: itemType.id_tipo_valor_item
                }
            })
        } catch (error: any) {
            return Result.fail(error.message).errorValue()
        }
    }
}