import { UserRepo } from '../model/UserRepo'
import { UseCase } from "@shared/UseCase";
import { UserMapper } from '../model/UserMapper';
import { Result } from '@shared/Result';

export default class PutUserUseCase implements UseCase<any, any> {
    constructor(private userRepo: UserRepo) {}

    async execute(userToInsert: any): Promise<any> {
        try {
            const user = UserMapper.toDomain(userToInsert).getValue()
            const result = await this.userRepo.save(user)

            return Result.ok(result)
        } catch (error: any) {
            return Result.fail(error.message)
        }
    }
}