import { IDbContext } from "@shared/database/DbContext";

export default class GetInvoiceItemTypeService {
    private dbContext: IDbContext

    constructor(dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async execute(): Promise<any> {
        const query = `SELECT * FROM eltanin.tipo_item_fatura ORDER BY nome` 

        return await this.dbContext.query(query)
    }
}