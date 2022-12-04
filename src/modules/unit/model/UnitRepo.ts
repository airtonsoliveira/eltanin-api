import { Result } from "@shared/Result";
import { IDbContext } from "@shared/database/DbContext";
import { Unit } from "../model/Unit";
import { Repo } from "@shared/Repo";
import { User } from "@modules/user/model/User";
import { UnitMapper } from "./UnitMapper";

interface IUnitRepo extends Repo<Unit> { }

export class UnitRepo implements IUnitRepo {
    private dbContext: IDbContext

    constructor(dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(unit: Unit) {
        const id = unit.id

        const query = `SELECT id_unidade FROM eltanin.unidade WHERE id_unidade = $1`

        const result = await this.dbContext.query(query, [id])

        return result?.length > 0
    }

    async getAll(idUser: string) {
        const unitQuery = `SELECT * FROM eltanin.unidade WHERE id_usuario = $1 ORDER BY nome`

        const unitResult = await this.dbContext.query(unitQuery, [idUser])

        const apportionmentQuery =
            `SELECT r.* FROM eltanin.unidade u
            LEFT JOIN eltanin.rateio r ON u.id_unidade = r.id_unidade_geradora
            WHERE u.id_usuario = $1 ORDER BY u.nome`
        
        const apportionmentResult = await this.dbContext.query(apportionmentQuery, [idUser])

        const result = unitResult.map((unit: any) => {
            return {
                ...unit,
                rateio: apportionmentResult.filter((item: any) => { return unit.id_unidade === item.id_unidade_geradora })
            }
        })

        return result
    }

    async getById(id: string, idUser: string) {
        const unitQuery = `SELECT * FROM eltanin.unidade WHERE id_unidade = $1 AND id_usuario = $2 ORDER BY nome`

        const unitResult = await this.dbContext.query(unitQuery, [id, idUser])

        const apportionmentQuery =
            `SELECT r.* FROM eltanin.unidade u
            LEFT JOIN eltanin.rateio r ON u.id_unidade = r.id_unidade_geradora
            WHERE u.id_unidade = $1 AND u.id_usuario = $2 ORDER BY u.nome`
        
        const apportionmentResult = await this.dbContext.query(apportionmentQuery, [id, idUser])

        const result = unitResult.map((unit: any) => {
            return {
                ...unit,
                rateio: apportionmentResult.filter((item: any) => { return unit.id_unidade === item.id_unidade_geradora })
            }
        })

        return result
    }

    async getByFilter(filter: any) {
        const args: any[] = []

        let query = `SELECT * FROM eltanin.unidade WHERE 1=1`

        query += this.optionalFilter('and WHERE id_usuario = ?', filter.idUser, args)

        const result = await this.dbContext.query(query, args)

        return result
    }

    async delete(id: string, idUser: string) { }
    async save(unit: Unit) {
        const exists = await this.exists(unit)
        
        if(exists || unit.id !== '0') {
            const params = UnitMapper.toUpdate(unit)

            const query =  `UPDATE eltanin.unidade
                            SET nome = $1,
                                nu_cep = $2,
                                tx_logradouro = $3,
                                tx_numero = $4,
                                tx_bairro = $5,
                                tx_complemento = $6,
                                nu_creditos = $7,
                                cd_instalacao = $8
                            WHERE id_unidade = $9`

            const result = await this.dbContext.query(query, [...params, unit.id])

            if(unit.apportionment) this.saveApportionments(unit.apportionment, unit.id)

            return result
        } else {
            const params = UnitMapper.toInsert(unit)

            const query =
                `INSERT INTO eltanin.unidade (
                    nome,
                    nu_cep,
                    tx_logradouro,
                    tx_numero,
                    tx_bairro,
                    tx_complemento,
                    id_usuario,
                    nu_creditos,
                    cd_instalacao
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

            const result = await this.dbContext.query(query, params)

            if(unit.apportionment) this.saveApportionments(unit.apportionment)

            return result
        }
    }

    async saveApportionments(apportionment: any[] , unitId?: string) {
        let lastUnitId
        if(unitId) {
            lastUnitId = unitId
        } else {
            const queryLastUnit = `SELECT id_unidade FROM eltanin.unidade ORDER BY id_unidade DESC LIMIT 1`
            const result = await this.dbContext.query(queryLastUnit)
            lastUnitId = result[0]?.id_unidade
        }

        let queryDelete = `DELETE FROM eltanin.rateio WHERE id_unidade_geradora = $1`
        await this.dbContext.query(queryDelete, [lastUnitId])

        let queryInsert = `INSERT INTO eltanin.rateio (porcentagem, id_unidade_consumidora, id_unidade_geradora) VALUES `
        const argsInsert: any[] = []
        let counterInsert = 2

        apportionment.forEach((item: any) => {
            argsInsert.push(item.percentual, item.consumerUnit)
            queryInsert += ` ($${counterInsert}, $${counterInsert+1}, $1),`
            counterInsert += 2
        })
        queryInsert = queryInsert.slice(0, -1)
        await this.dbContext.query(queryInsert, [lastUnitId, ...argsInsert])
    }

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