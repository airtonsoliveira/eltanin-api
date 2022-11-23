import { UnitRepo } from '../model/UnitRepo'
import { UseCase } from "@shared/UseCase";
import { UnitMapper } from '../model/UnitMapper';

export default class PostUnitUseCase implements UseCase<any, any> {
    constructor(private unitRepo: UnitRepo) {}

    async execute (unitToInsert: any): Promise<any> {
        try {
            const unit = UnitMapper.toDomain(unitToInsert).getValue()
            const result = await this.unitRepo.save(unit)

            return result
        } catch (error: any) {
            return error.message
        }
    }
}