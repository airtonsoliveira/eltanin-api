import { Result } from "../../../shared/Result";
import { IDbContext } from "../../../shared/database/DbContext";
import { Unit } from "../model/Unit";
import { Repo } from "../../../shared/Repo";

interface IUnitRepo extends Repo<Unit> {}

export class UnitRepo implements IUnitRepo {
    private dbContext: IDbContext

    constructor (dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(unit: Unit) {
        const id = unit.id

        const query = 'SELECT id_unidade FROM eltanin.unidade WHERE id_unidade = $1'

        const result = await this.dbContext.query(query, [id])

        return result?.lenght > 0
    }

    async getAll() {
        const query = 'SELECT * FROM eltanin.unidade ORDER BY id_unidade'

        const result = await this.dbContext.query(query)

        return result
    }

    async getById(id: string) {
        const query = 'SELECT * FROM eltanin.unidade WHERE id_unidade = $1'

        const result = await this.dbContext.query(query, [id])

        return result
    }

    async delete(unit: Unit) {}
    async save(unit: Unit) {}

}