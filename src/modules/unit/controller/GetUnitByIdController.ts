import Controller from '@shared/Controller';
import { UseCase } from '@shared/UseCase';

export default class GetUnitByIdController extends Controller {
    private useCase: UseCase<any, any>

    constructor(useCase: UseCase<any, any>) {
        super()
        this.useCase = useCase
    }

    public async executeImpl(req: any): Promise<any> {
        const dto = {
            idUser: req.headers.iduser,
            idUnit: req.params.id
        }
        const response: any = await this.useCase.execute(dto)
        return this.ok(response)
    }
}