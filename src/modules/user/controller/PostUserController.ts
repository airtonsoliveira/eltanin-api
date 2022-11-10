import Controller from '@shared/Controller';
import { UseCase } from '@shared/UseCase';

export default class PostUserController extends Controller {
    private useCase: UseCase<any, any>

    constructor(useCase: UseCase<any, any>) {
        super()
        this.useCase = useCase
    }

    public async executeImpl(req: any): Promise<any> {
        const dto = {
            nome: this.requiredParam(req.body.name),
            nu_cpf: this.optionalParam(req.body.cpf),
            nu_cnpj: this.optionalParam(req.body.cnpj),
            tx_email: this.requiredParam(req.body.email),
            tx_senha: this.requiredParam(req.body.password)
        }

        const response: any = await this.useCase.execute(dto)
        return this.ok(response)
    }
}