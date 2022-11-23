import { DistributorRepo } from '../model/DistributorRepo'
import { UseCase } from "@shared/UseCase";

export default class GetDistributorUseCase implements UseCase<any, any> {
    constructor(private distributorRepo: DistributorRepo) {}

    async execute (): Promise<any> {
        const result = await this.distributorRepo.getAll()

        return result.map((distributor: any) => {
            return {
                id: distributor.id_distribuidora,
                name: distributor.nome
            }
        })
    }
}