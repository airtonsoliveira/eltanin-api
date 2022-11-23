import { Result } from "@shared/Result";
import { IDbContext } from "@shared/database/DbContext";
import { Distributor } from "../model/Distributor";
import { Repo } from "@shared/Repo";

interface IDistributorRepo extends Repo<Distributor> {}

export class DistributorRepo implements IDistributorRepo {
    private dbContext: IDbContext

    constructor (dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(distributor: Distributor) {
        const id = distributor.id

        const query = `SELECT id_distribuidora FROM eltanin.distribuidora WHERE id_distribuidora = $1`

        const result = await this.dbContext.query(query, [id])

        return result?.length > 0
    }

    async getAll() {
        const query = `SELECT * FROM eltanin.distribuidora ORDER BY nome`

        const result = await this.dbContext.query(query)

        return result
    }

    async getById(id: string) {
        const query = `SELECT * FROM eltanin.distribuidora WHERE id_distribuidora = $1`

        const result = await this.dbContext.query(query, [id])

        return result
    }

    async delete(distributor: Distributor) {}
    async save(distributor: Distributor) {}

}