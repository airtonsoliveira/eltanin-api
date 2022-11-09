import { Result } from '@shared/Result'

interface UserProps {
    name: string,
    cpf?: string,
    cnpj?: string,
    email: string
}

export class User {
    protected _id: string
    protected props: any

    private constructor(props: UserProps, id?: string) {
        this._id = id ? id : '0'
        this.props = props
    }

    static create(props: UserProps, id?: string) {
        const user = new User(props, id)
        return Result.ok(user)
    }

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id
    }

    get name(): string {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get cpf(): string {
        return this.props.cpf
    }

    set cpf(cpf: string) {
        this.props.cpf = cpf
    }

    get cnpj(): string {
        return this.props.cnpj
    }

    set cnpj(cnpj: string) {
        this.props.cnpj = cnpj
    }

    get email(): string {
        return this.props.email
    }

    set email(email: string) {
        this.props.email = email
    }
}