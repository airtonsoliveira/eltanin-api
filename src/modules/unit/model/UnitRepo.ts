import { Result } from "@shared/Result";
import { IDbContext } from "@shared/database/DbContext";
import { Unit } from "../model/Unit";
import { Repo } from "@shared/Repo";
import { User } from "@modules/user/model/User";

interface IUnitRepo extends Repo<Unit> { }

export class UnitRepo implements IUnitRepo {
    private dbContext: IDbContext

    constructor(dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(unit: Unit) {
        const id = unit.id

        const query = 'SELECT id_unidade FROM eltanin.unidade WHERE id_unidade = $1'

        const result = await this.dbContext.query(query, [id])

        return result?.length > 0
    }

    async getAll(idUser: string) {
        const query = 'SELECT * FROM eltanin.unidade WHERE id_usuario = $1 ORDER BY name'

        const result = await this.dbContext.query(query, [idUser])

        return result
    }

    async getById(id: string, idUser: string) {
        const query = 'SELECT * FROM eltanin.unidade WHERE id_unidade = $1 AND id_usuario = $2'

        const result = await this.dbContext.query(query, [id, idUser])

        return result
    }

    async getByFilter(filter: any) {
        const args: any[] = []

        let query = 'SELECT * FROM eltanin.unidade WHERE 1=1'

        query += this.optionalFilter('and WHERE id_usuario = ?', filter.idUser, args)

        const result = await this.dbContext.query(query, args)

        return result
    }

    async delete(unit: Unit) { }
    async save(unit: Unit) { }

    private optionalFilter(append: string, param: any, args?: any[]) {
        if (param) {
            if (args) {
                args.push(param)
                append.replace(/\?/g, '$' + args.length)
            }
            return ' ' + append + ' '
        }
        return ''
    }
}