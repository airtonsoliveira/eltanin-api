import { Result } from "../../../shared/Result";
import { IDbContext } from "../../../shared/database/DbContext";
import { Critique } from "../model/Critique";
import { Repo } from "../../../shared/Repo";

interface ICritiqueRepo extends Repo<Critique> {}

export class CritiqueRepo implements ICritiqueRepo {
    private dbContext: IDbContext

    constructor (dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(critique: Critique) {
        const id = critique.id

        const query = 'SELECT id_critica FROM eltanin.critica WHERE id_critica = $1'

        const result = await this.dbContext.query(query, [id])

        return result?.lenght > 0
    }

    async getAll() {
        const query = 'SELECT * FROM eltanin.critica ORDER BY id_critica'

        const result = await this.dbContext.query(query)

        return result
    }

    async getById(id: string) {
        const query = 'SELECT * FROM eltanin.critica WHERE id_critica = $1'

        const result = await this.dbContext.query(query, [id])

        return result
    }

    async delete(critique: Critique) {}
    async save(critique: Critique) {}

}