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
        const query = `SELECT * FROM eltanin.unidade WHERE id_usuario = $1 ORDER BY nome`

        const result = await this.dbContext.query(query, [idUser])

        return result
    }

    async getById(id: string, idUser: string) {
        const query = `SELECT * FROM eltanin.unidade WHERE id_unidade = $1 AND id_usuario = $2`

        const result = await this.dbContext.query(query, [id, idUser])

        return result
    }

    async getByFilter(filter: any) {
        const args: any[] = []

        let query = `SELECT * FROM eltanin.unidade WHERE 1=1`

        query += this.optionalFilter('and WHERE id_usuario = ?', filter.idUser, args)

        const result = await this.dbContext.query(query, args)

        return result
    }

    async delete(unit: Unit) { }
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

            console.log(params)

            return result
        }
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