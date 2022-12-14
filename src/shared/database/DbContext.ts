import { Pool } from 'pg'

interface IDbContext {
    getConnection(): Promise<any>
    query(stmt: string, params?: any): Promise<any>
}

class DbContext implements IDbContext {
    private pool = new Pool({
        user: process.env.PGUSER || 'postgres',
        host: process.env.PGHOST || 'localhost',
        database: process.env.PGDATABASE || 'postgres',
        password: process.env.PGPASSWORD || 'admin123',
        port: Number(process.env.PGPORT) || 5432
    })

    async getConnection() {
        return await this.pool.connect()
    }

    async query(stmt: string, params?: any[]): Promise<any[]> {
        try {
            const queryParams = params ?? []
            const result = await this.pool.query(stmt, queryParams)
            return result.rows
        } catch (error: any) {
            throw new Error(`[DB Context Error]: ${error}`)
        }
    }
}

const dbContext = new DbContext()

export {
    IDbContext,
    dbContext
}