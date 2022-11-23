import { Result } from "@shared/Result";
import { IDbContext } from "@shared/database/DbContext";
import { Invoice } from "../model/Invoice";
import { Repo } from "@shared/Repo";

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
            `SELECT f.id_fatura, ifa.*, tifa.* FROM eltanin.fatura f
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
            `SELECT f.id_fatura, ifa.*, tifa.* FROM eltanin.fatura f
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

    async delete(invoice: Invoice) { }
    async save(invoice: Invoice) { }

}