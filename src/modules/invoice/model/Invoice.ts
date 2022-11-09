import { Result } from '@shared/Result'

interface InvoiceProps {
    referenceMonth: string,
    dueDate?: string,
    issueDate?: string,
    value?: number,
    storedFile?: string,
    userId: string,
    distributorId: string,
    unitId: string
}

export class Invoice {
    protected _id: string
    protected props: any

    private constructor(props: InvoiceProps, id?: string) {
        this._id = id ? id : '0'
        this.props = props
    }

    static create(props: InvoiceProps, id?: string) {
        const invoice = new Invoice(props, id)
        return Result.ok(invoice)
    }

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id
    }

    get referenceMonth(): string {
        return this.props.referenceMonth
    }

    set referenceMonth(referenceMonth: string) {
        this.props.referenceMonth = referenceMonth
    }

    get dueDate(): string {
        return this.props.dueDate
    }

    set dueDate(dueDate: string) {
        this.props.dueDate = dueDate
    }

    get issueDate(): string {
        return this.props.issueDate
    }

    set issueDate(issueDate: string) {
        this.props.issueDate = issueDate
    }

    get value(): string {
        return this.props.value
    }

    set value(value: string) {
        this.props.value = value
    }

    get storedFile(): string {
        return this.props.storedFile
    }

    set storedFile(storedFile: string) {
        this.props.storedFile = storedFile
    }

    get userId(): string {
        return this.props.userId
    }

    set userId(userId: string) {
        this.props.userId = userId
    }

    get distributorId(): string {
        return this.props.distributorId
    }

    set distributorId(distributorId: string) {
        this.props.distributorId = distributorId
    }

    get unitId(): string {
        return this.props.unitId
    }

    set unitId(unitId: string) {
        this.props.unitId = unitId
    }
}