import { Result } from './Result'

export interface Repo<T> {
    exists(t: T): Promise<boolean>
    getAll(filters?: any): Promise<Result<T>[]>
    getById(id: string, filters?: any): Promise<Result<T>>
    delete(t: T): Promise<any>
    save(t: T): Promise<any>
}