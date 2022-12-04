import { IDbContext } from "@shared/database/DbContext";

export default class GetInvoiceByFilterService {
    private dbContext: IDbContext
    private filterCounter = 0

    constructor(dbContext: IDbContext) {
        this.dbContext = dbContext
    }

    async execute(idUser: string, filters: any): Promise<any> {
        const invoiceQuery = `SELECT * FROM eltanin.fatura f WHERE f.id_usuario = $1`
        const itensQuery =
            `SELECT ifa.*, tifa.* FROM eltanin.fatura f
            LEFT JOIN eltanin.item_fatura ifa ON f.id_fatura = ifa.id_fatura
            LEFT JOIN eltanin.tipo_item_fatura tifa ON ifa.id_tipo_item_fatura = tifa.id_tipo_item_fatura
            WHERE f.id_usuario = $1`

        const args: any[] = []
        this.filterCounter = 1
        let queryFilters = ''

        queryFilters += this.optionalQueryFilter('AND f.nu_mes_referencia = ?', filters.referenceMonth, args, this.filterCounter)
        queryFilters += this.optionalQueryFilter('AND f.id_unidade = ?', filters.unitId, args, this.filterCounter)

        const invoiceResult = await this.dbContext.query(invoiceQuery + queryFilters, [idUser, ...args])
        const itensResult = await this.dbContext.query(itensQuery + queryFilters, [idUser, ...args])

        const result = invoiceResult.map((invoice: any) => {
            return {
                ...invoice,
                itens_fatura: itensResult.filter((item: any) => { return invoice.id_fatura === item.id_fatura })
            }
        })

        return result
    }

    optionalQueryFilter(queryFilter: string, argument: any, args?: any[], filterCounter?: number) {
        if (argument) {
            if (args) {
                [...queryFilter].forEach((char) => {
                    if (char === '?') args.push(argument)
                })
            }
            if (filterCounter) {
                this.filterCounter++
                return ' ' + queryFilter.replace('?', `$${this.filterCounter}`)
            }
            return ' ' + queryFilter
        }
        return ''
    }
}