import { Result } from '@shared/Result'

interface CritiqueProps {
    name: string,
    description?: string,
    formula?: string,
    requirements?: string
}

export class Critique {
    protected _id: string
    protected props: any

    private constructor(props: CritiqueProps, id?: string) {
        this._id = id ? id : '0'
        this.props = props
    }

    static create(props: CritiqueProps, id?: string) {
        const critique = new Critique(props, id)
        return Result.ok(critique)
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

    get description(): string {
        return this.props.description
    }

    set description(description: string) {
        this.props.description = description
    }

    get formula(): string {
        return this.props.formula
    }

    set formula(formula: string) {
        this.props.formula = formula
    }

    get requirements(): string {
        return this.props.requirements
    }

    set requirements(requirements: string) {
        this.props.requirements = requirements
    }
}