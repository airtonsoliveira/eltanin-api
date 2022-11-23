import { DistributorRepo } from '../model/DistributorRepo'
import { UseCase } from "@shared/UseCase";

export default class GetDistributorByIdUseCase implements UseCase<any, any> {
    constructor(private distributorRepo: DistributorRepo) {}

    async execute (idDistributor: string): Promise<any> {
        const result = await this.distributorRepo.getById(idDistributor)

        return result.map((distributor: any) => {
            return {
                id: distributor.id_distribuidora,
                name: distributor.nome
            }
        })
    }
}