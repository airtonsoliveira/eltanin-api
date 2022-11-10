import jwt from 'jsonwebtoken'

export default class SignCheckService {
    async execute(token: string): Promise<any> {
        try {
            jwt.verify(token, 'secret')
            return { token: token }
        } catch (err: any) {
            throw new Error('Invalid token')
        }
    }
}