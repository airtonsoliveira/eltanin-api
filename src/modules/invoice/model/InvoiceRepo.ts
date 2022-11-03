import { Result } from "../../../shared/Result";
import { IDbContext } from "../../../shared/database/DbContext";
import { Invoice } from "../model/Invoice";
import { Repo } from "../../../shared/Repo";

interface IInvoiceRepo extends Repo<Invoice> {}

export class InvoiceRepo implements IInvoiceRepo {
    private dbContext: IDbContext

    constructor (dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async exists(invoice: Invoice) {
        const id = invoice.id

        const query = 'SELECT id_fatura FROM eltanin.fatura WHERE id_fatura = $1'

        const result = await this.dbContext.query(query, [id])

        return result?.lenght > 0
    }

    async getAll() {
        const query = 'SELECT * FROM eltanin.fatura ORDER BY id_fatura'

        const result = await this.dbContext.query(query)

        return result
    }

    async getById(id: string) {
        const query = 'SELECT * FROM eltanin.fatura WHERE id_fatura = $1'

        const result = await this.dbContext.query(query, [id])

        return result
    }

    async delete(invoice: Invoice) {}
    async save(invoice: Invoice) {}

}