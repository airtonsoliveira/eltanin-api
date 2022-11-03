import { Result } from '../../../shared/Result'

interface DistributorProps {
    name: string
}

export class Distributor {
    protected _id: string
    protected props: any

    private constructor(props: DistributorProps, id?: string) {
        this._id = id ? id : '0'
        this.props = props
    }

    static create(props: DistributorProps, id?: string) {
        const distributor = new Distributor(props, id)
        return Result.ok(distributor)
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
}