import { User } from "./User";

export class UserMapper {

    static toInsert(user: User) {
        return [
            user.name,
            user.cpf,
            user.cnpj,
            user.email,
            user.password
        ]
    }

    static toUpdate(user: User) {
        return [
            user.name,
            user.cpf,
            user.cnpj
        ]
    }

    static toDomain(data: any) {
        return User.create({
            name: data.nome,
            cpf: data.nu_cpf,
            cnpj: data.nu_cnpj,
            email: data.tx_email,
            password: data.tx_senha
        },
            data.id_usuario)
    }
}