import Controller from '@shared/Controller';
import { UseCase } from '@shared/UseCase';

export default class GetInvoiceController extends Controller {
    private useCase: UseCase<any, any>

    constructor(useCase: UseCase<any, any>) {
        super()
        this.useCase = useCase
    }

    public async executeImpl(req: any): Promise<any> {
        let response: any
        let dto: any = {
            idUser: req.headers.iduser
        }

        if (Object.keys(req.query).length > 0) {
            dto['filters'] = {
                referenceMonth: req.query.referenceMonth,
                unitId: req.query.unitId
            }
        }

        response = await this.useCase.execute(dto)

        return this.ok(response)
    }
}