import { DistributorRepo } from '../model/DistributorRepo'
import { UseCase } from "../../../shared/UseCase";

export default class GetDistributorUseCase implements UseCase<any, any> {
    constructor(private distributorRepo: DistributorRepo) {}

    async execute (): Promise<any> {
        const result = await this.distributorRepo.getAll()

        return result.map((distributor: any) => {
            return {
                id: distributor.id_critica,
                name: distributor.nome,
                description: distributor.tx_descricao,
                formula: distributor.tx_formula,
                requirements: distributor.tx_requisitos
            }
        })
    }
}