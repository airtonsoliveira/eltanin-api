import jwt from 'jsonwebtoken'

export default class SignCheckService {
    async execute(token: string): Promise<any> {
        try {
            jwt.verify(token, 'secret')
            return 200
        } catch (err: any) {
            return 401
        }
    }
}