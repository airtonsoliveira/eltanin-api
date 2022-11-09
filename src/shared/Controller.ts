import { ApiResponse } from './ApiResponse'

export default abstract class Controller {
    protected abstract executeImpl(req: any): Promise<void | any>

    public async execute(req: any): Promise<ApiResponse> {
        try {
            return await this.executeImpl(req)
        } catch (err: any) {
            console.log('[Controller]: Uncaught error')
            console.log(err)
            return this.fail(err)
        }
    }

    private successResponse(code: number, data?: any) {
        return { code, data }
    }

    private errorResponse(code: number, message: string) {
        return { code, message }
    }

    public ok(data?: any) {
        return this.successResponse(200, data)
    }

    public notOk(message: string) {
        return this.errorResponse(200, message)
    }

    public created() {
        return this.successResponse(201)
    }

    public accepted() {
        return this.successResponse(202)
    }

    public badRequest(message: string) {
        return this.errorResponse(400, message)
    }

    public unauthorized(message: string) {
        return this.errorResponse(401, message)
    }

    public forbidden(message: string) {
        return this.errorResponse(403, message)
    }

    public notFound(message: string) {
        return this.errorResponse(404, message)
    }

    public methodNotAllowed(message: string) {
        return this.errorResponse(405, message)
    }

    public tooManyRequests(message: string) {
        return this.errorResponse(429, message)
    }

    public fail(error: string) {
        return this.errorResponse(500, error)
    }

    public requiredParam(param: any) {
        if(!param) throw Error('missing required param')
        return param
    }

    public optionalParam(param: any) {
        return param ? param : null
    }
}