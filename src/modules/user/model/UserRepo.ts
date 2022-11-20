import { Result } from "@shared/Result";
import { IDbContext } from "@shared/database/DbContext";
import { User } from "../model/User";
import { Repo } from "@shared/Repo";
import { UserMapper } from "./UserMapper";

interface IUserRepo extends Repo<User> {}

export class UserRepo implements IUserRepo {
    private dbContext: IDbContext

    constructor (dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(user: User) {
        const id = user.id

        const query = `SELECT id_usuario FROM eltanin.usuario WHERE id_usuario = $1`

        const result = await this.dbContext.query(query, [id])

        return result?.length > 0
    }

    async getAll() {
        const query = `SELECT * FROM eltanin.usuario ORDER BY id_usuario`

        const result = await this.dbContext.query(query)

        return result
    }

    async getById(id: string) {
        const query = `SELECT * FROM eltanin.usuario WHERE id_usuario = $1`

        const result = await this.dbContext.query(query, [id])

        return result
    }

    async delete(user: User) {}
    async save(user: User) {
        const exists = await this.exists(user)
        
        if(exists || user.id !== '0') {
            const params = UserMapper.toUpdate(user)

            const query =  `UPDATE eltanin.usuario
                            SET nome = $1, nu_cpf = $2, nu_cnpj = $3
                            WHERE id_usuario = $4`

            const result = await this.dbContext.query(query, [...params, user.id])

            return result
        } else {
            const params = UserMapper.toInsert(user)

            const query = `INSERT INTO eltanin.usuario (nome, nu_cpf, nu_cnpj, tx_email, tx_senha) VALUES ($1, $2, $3, $4, $5)`

            const result = await this.dbContext.query(query, params)

            return result
        }
    }

}