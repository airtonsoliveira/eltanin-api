import { Request, Response } from 'express'

import { ApiResponse } from '../ApiResponse'
import Controller from '../Controller'

const controllerHandler = (controller: Controller) => {
    return async (req: Request, res: Response): Promise<Response|void> => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: req.headers,
            baseUrl: req.baseUrl,
        }

        const response: ApiResponse = await controller.execute(httpRequest)

        res.header("Access-Control-Allow-Origin", "https://eltanin-front.vercel.app")

        return res.status(response.code).json({
            message: response.message,
            data: response.data
        })
    }
}

export default controllerHandler
