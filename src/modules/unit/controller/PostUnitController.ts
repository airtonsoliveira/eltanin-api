import Controller from '@shared/Controller';
import { UseCase } from '@shared/UseCase';

export default class PostUnitController extends Controller {
    private useCase: UseCase<any, any>

    constructor(useCase: UseCase<any, any>) {
        super()
        this.useCase = useCase
    }

    public async executeImpl(req: any): Promise<any> {
        const dto = {
            nome: this.requiredParam(req.body.name),
            nu_cep: this.optionalParam(req.body.zipCode),
            tx_logradouro: this.optionalParam(req.body.street),
            tx_numero: this.optionalParam(req.body.number),
            tx_bairro: this.optionalParam(req.body.neighborhood),
            tx_complemento: this.optionalParam(req.body.complement),
            id_usuario: this.requiredParam(req.headers.iduser),
            nu_creditos: this.optionalParam(req.body.credits),
            cd_instalacao: this.requiredParam(req.body.code),
            rateio: this.optionalParam(req.body.apportionment)
        }
        const response: any = await this.useCase.execute(dto)
        return this.ok(response)
    }
}