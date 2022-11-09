import Controller from '@shared/Controller';
import { UseCase } from '@shared/UseCase';

export default class SignController extends Controller {
    private useCase: UseCase<any, any>

    constructor(useCase: UseCase<any, any>) {
        super()
        this.useCase = useCase
    }

    public async executeImpl(req: any): Promise<any> {
        const dto = {
            user: this.requiredParam(req.body.user),
            pass: this.requiredParam(req.body.pass)
        }

        const response: any = await this.useCase.execute(dto)
        return this.ok(response)
    }
}