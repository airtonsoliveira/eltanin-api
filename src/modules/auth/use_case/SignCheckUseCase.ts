import SignCheckService from "../service/SignCheckService";
import { UseCase } from "@shared/UseCase";
import { Result } from '@shared/Result';

export default class SignCheckUseCase implements UseCase<any, any> {
    constructor(private signCheckService: SignCheckService) {}

    async execute(token: string): Promise<any> {
        try {
            const result = await this.signCheckService.execute(token)

            return Result.ok(result)
        } catch (error: any) {
            return Result.fail(error.message)
        }
    }
}