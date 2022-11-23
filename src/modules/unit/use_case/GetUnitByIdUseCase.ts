import { UnitRepo } from '../model/UnitRepo'
import { UseCase } from "@shared/UseCase";

export default class GetUnitByIdUseCase implements UseCase<any, any> {
    constructor(private unitRepo: UnitRepo) {}

    async execute (req: { idUnit: string, idUser: string }): Promise<any> {
        const result = await this.unitRepo.getById(req.idUnit, req.idUser)

        return result.map((unit: any) => {
            return {
                id: unit.id_unidade,
                name: unit.nome,
                zipCode: unit.nu_cep,
                street: unit.tx_logradouro,
                number: unit.tx_numero,
                neighborhood: unit.tx_bairro,
                complement: unit.tx_complemento,
                userId: unit.id_usuario,
                credits: unit.nu_creditos,
                code: unit.cd_instalacao
            }
        })
    }
}