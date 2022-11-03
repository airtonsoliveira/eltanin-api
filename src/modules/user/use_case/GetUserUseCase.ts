import { UserRepo } from '../model/UserRepo'
import { UseCase } from "../../../shared/UseCase";

export default class GetUserUseCase implements UseCase<any, any> {
    constructor(private userRepo: UserRepo) {}

    async execute (): Promise<any> {
        const result = await this.userRepo.getAll()

        return result.map((user: any) => {
            return {
                id: user.id_usuario,
                name: user.nome,
                cpf: user.nu_cpf,
                cnpj: user.nu_cnpj,
                email: user.tx_email
            }
        })
    }
}