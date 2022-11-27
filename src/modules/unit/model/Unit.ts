import { Result } from '@shared/Result'

interface UnitProps {
    name: string,
    zipCode?: string,
    street?: string,
    number?: string,
    neighborhood?: string,
    complement?: string,
    userId: string,
    credits?: string,
    code: string,
    apportionment?: any[]
}

export class Unit {
    protected _id: string
    protected props: any

    private constructor(props: UnitProps, id?: string) {
        this._id = id ? id : '0'
        this.props = props
    }

    static create(props: UnitProps, id?: string) {
        const unit = new Unit(props, id)
        return Result.ok(unit)
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

    get zipCode(): string {
        return this.props.zipCode
    }

    set zipCode(zipCode: string) {
        this.props.zipCode = zipCode
    }

    get street(): string {
        return this.props.street
    }

    set street(street: string) {
        this.props.street = street
    }

    get number(): string {
        return this.props.number
    }

    set number(number: string) {
        this.props.number = number
    }

    get neighborhood(): string {
        return this.props.neighborhood
    }

    set neighborhood(neighborhood: string) {
        this.props.neighborhood = neighborhood
    }

    get complement(): string {
        return this.props.complement
    }

    set complement(complement: string) {
        this.props.complement = complement
    }

    get userId(): string {
        return this.props.userId
    }

    set userId(userId: string) {
        this.props.userId = userId
    }

    get credits(): string {
        return this.props.credits
    }

    set credits(credits: string) {
        this.props.credits = credits
    }

    get code(): string {
        return this.props.code
    }

    set code(code: string) {
        this.props.code = code
    }

    get apportionment(): any[] {
        return this.props.apportionment
    }

    set apportionment(apportionment: any[]) {
        this.props.apportionment = apportionment
    }
}