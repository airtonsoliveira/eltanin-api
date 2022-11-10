
import SignService from "../service/SignService";
import { UseCase } from "@shared/UseCase";
import { Result } from '@shared/Result';

export default class PostUserUseCase implements UseCase<any, any> {
    constructor(private signService: SignService) { }

    async execute(params: any): Promise<any> {
        try {
            const result = await this.signService.execute(params)

            return Result.ok(result)
        } catch (error: any) {
            return Result.fail(error.message)
        }
    }
}