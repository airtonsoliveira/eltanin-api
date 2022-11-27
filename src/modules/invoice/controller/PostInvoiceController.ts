import Controller from '@shared/Controller';
import { UseCase } from '@shared/UseCase';

export default class PostInvoiceController extends Controller {
    private useCase: UseCase<any, any>

    constructor(useCase: UseCase<any, any>) {
        super()
        this.useCase = useCase
    }

    public async executeImpl(req: any): Promise<any> {

        const dto = {
            nu_mes_referencia: this.requiredParam(req.body.referenceMonth),
            dt_vencimento: this.optionalParam(req.body.dueDate),
            dt_emissao: this.optionalParam(req.body.issueDate),
            nu_valor: this.optionalParam(req.body.value),
            tx_arquivo_armazenado: this.optionalParam(req.body.storedFile),
            id_usuario: this.optionalParam(req.headers.iduser),
            id_distribuidora: this.requiredParam(req.body.distributorId),
            id_unidade: this.requiredParam(req.body.unitId),
            itens_fatura: this.optionalParam(req.body.items),
            file: this.optionalParam(req.body.file),
        }

        const response: any = await this.useCase.execute(dto)
        return this.ok(response)
    }
}