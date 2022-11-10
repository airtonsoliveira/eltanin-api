import { UserRepo } from '../model/UserRepo'
import { UseCase } from "@shared/UseCase";
import { UserMapper } from '../model/UserMapper';

export default class PostUserUseCase implements UseCase<any, any> {
    constructor(private userRepo: UserRepo) {}

    async execute(userToInsert: any): Promise<any> {
        try {
            const user = UserMapper.toDomain(userToInsert).getValue()
            const result = await this.userRepo.save(user)

            return result
        } catch (error: any) {
            return error.message
        }
    }
}