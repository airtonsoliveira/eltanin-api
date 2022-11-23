import { UnitRepo } from '../model/UnitRepo'
import { UseCase } from "@shared/UseCase";
import { UnitMapper } from '../model/UnitMapper';

export default class PutUnitUseCase implements UseCase<any, any> {
    constructor(private unitRepo: UnitRepo) {}

    async execute (unitToUpdate: any): Promise<any> {
        try {
            const unit = UnitMapper.toDomain(unitToUpdate).getValue()
            const result = await this.unitRepo.save(unit)

            return result
        } catch (error: any) {
            return error.message
        }
    }
}