import { Result } from "@shared/Result";
import { IDbContext } from "@shared/database/DbContext";
import { Invoice } from "../model/Invoice";
import { Repo } from "@shared/Repo";
import { InvoiceMapper } from "./InvoiceMapper";

interface IInvoiceRepo extends Repo<Invoice> { }

export class InvoiceRepo implements IInvoiceRepo {
    private dbContext: IDbContext

    constructor(dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(invoice: Invoice) {
        const id = invoice.id

        const query = `SELECT id_fatura FROM eltanin.fatura WHERE id_fatura = $1`

        const result = await this.dbContext.query(query, [id])

        return result?.length > 0
    }

    async getAll(idUser: string) {
        const invoiceQuery = `SELECT * FROM eltanin.fatura f WHERE f.id_usuario = $1 ORDER BY f.id_fatura`

        const invoiceResult = await this.dbContext.query(invoiceQuery, [idUser])

        const itensQuery =
            `SELECT ifa.*, tifa.* FROM eltanin.fatura f
            LEFT JOIN eltanin.item_fatura ifa ON f.id_fatura = ifa.id_fatura
            LEFT JOIN eltanin.tipo_item_fatura tifa ON ifa.id_tipo_item_fatura = tifa.id_tipo_item_fatura
            WHERE f.id_usuario = $1`

        const itensResult = await this.dbContext.query(itensQuery, [idUser])

        const result = invoiceResult.map((invoice: any) => {
            return {
                ...invoice,
                itens_fatura: itensResult.filter((item: any) => { return invoice.id_fatura === item.id_fatura })
            }
        })

        return result
    }

    async getById(id: string, idUser: string) {
        const invoiceQuery = `SELECT * FROM eltanin.fatura f WHERE f.id_fatura = $1 and f.id_usuario = $2 ORDER BY f.id_fatura`

        const invoiceResult = await this.dbContext.query(invoiceQuery, [id, idUser])

        const itensQuery =
            `SELECT ifa.*, tifa.* FROM eltanin.fatura f
            LEFT JOIN eltanin.item_fatura ifa ON f.id_fatura = ifa.id_fatura
            LEFT JOIN eltanin.tipo_item_fatura tifa ON ifa.id_tipo_item_fatura = tifa.id_tipo_item_fatura
            WHERE f.id_fatura = $1 and f.id_usuario = $2`

        const itensResult = await this.dbContext.query(itensQuery, [id, idUser])

        const result = invoiceResult.map((invoice: any) => {
            return {
                ...invoice,
                itens_fatura: itensResult.filter((item: any) => { return invoice.id_fatura === item.id_fatura })
            }
        })

        return result
    }

    async delete(id: string, idUser: string) {
        const invoiceQuery = `DELETE FROM eltanin.fatura f WHERE f.id_fatura = $1 and f.id_usuario = $2`
        const invoiceResult = await this.dbContext.query(invoiceQuery, [id, idUser])
        return invoiceResult
    }

    async save(invoice: Invoice) {
        const exists = await this.exists(invoice)

        if(exists || invoice.id !== '0') {
            const params = InvoiceMapper.toUpdate(invoice)

            const query =  `UPDATE eltanin.fatura
                            SET nu_mes_referencia = $1,
                                dt_vencimento = $2,
                                dt_emissao = $3,
                                nu_valor = $4,
                                tx_arquivo_armazenado = $5,
                                id_distribuidora = $6,
                                id_unidade = $7
                            WHERE id_fatura = $8`

            const result = await this.dbContext.query(query, [...params, invoice.id])

            if(invoice.items) this.saveItems(invoice.items, invoice.id)

            return result
        } else {
            const params = InvoiceMapper.toInsert(invoice)

            const query =
                `INSERT INTO eltanin.fatura (
                    nu_mes_referencia,
                    dt_vencimento,
                    dt_emissao,
                    nu_valor,
                    tx_arquivo_armazenado,
                    id_usuario,
                    id_distribuidora,
                    id_unidade
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

            const result = await this.dbContext.query(query, params)

            if(invoice.items) this.saveItems(invoice.items)

            return result
        }
    }

    async saveItems(items: any[] , invoiceId?: string) {
        let lastInvoiceId
        if(invoiceId) {
            lastInvoiceId = invoiceId
        } else {
            const queryLastInvoice = `SELECT id_fatura FROM eltanin.fatura ORDER BY id_fatura DESC LIMIT 1`
            const result = await this.dbContext.query(queryLastInvoice)
            lastInvoiceId = result[0]?.id_fatura
        }

        let queryDelete = `DELETE FROM eltanin.item_fatura WHERE id_fatura = $1`
        await this.dbContext.query(queryDelete, [lastInvoiceId])

        let queryInsert = `INSERT INTO eltanin.item_fatura (valor, id_tipo_item_fatura, id_fatura) VALUES `
        const argsInsert: any[] = []
        let counterInsert = 2

        items.forEach((item: any) => {
            argsInsert.push(item.value, item.type)
            queryInsert += ` ($${counterInsert}, $${counterInsert+1}, $1),`
            counterInsert += 2
        })
        queryInsert = queryInsert.slice(0, -1)
        await this.dbContext.query(queryInsert, [lastInvoiceId, ...argsInsert])
    }
}