import Controller from '@shared/Controller';
import { UseCase } from '@shared/UseCase';

export default class GetUnitController extends Controller {
    private useCase: UseCase<any, any>

    constructor(useCase: UseCase<any, any>) {
        super()
        this.useCase = useCase
    }

    public async executeImpl(req: any): Promise<any> {
        const idUser = req.headers.iduser
        const response: any = await this.useCase.execute(idUser)
        return this.ok(response)
    }
}