import { Result } from "../../../shared/Result";
import { IDbContext } from "../../../shared/database/DbContext";
import { User } from "../model/User";
import { Repo } from "../../../shared/Repo";

interface IUserRepo extends Repo<User> {}

export class UserRepo implements IUserRepo {
    private dbContext: IDbContext

    constructor (dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(user: User) {
        const id = user.id

        const query = 'SELECT id_usuario FROM eltanin.usuario WHERE id_usuario = $1'

        const result = await this.dbContext.query(query, [id])

        return result?.lenght > 0
    }

    async getAll() {
        const query = 'SELECT * FROM eltanin.usuario ORDER BY id_usuario'

        const result = await this.dbContext.query(query)

        return result
    }

    async getById(id: string) {
        const query = 'SELECT * FROM eltanin.usuario WHERE id_usuario = $1'

        const result = await this.dbContext.query(query, [id])

        return result
    }

    async delete(user: User) {}
    async save(user: User) {}

}