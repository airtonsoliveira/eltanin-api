import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import randomstring from 'randomstring'
import { dbContext } from "@shared/database/DbContext";

export default class SignService {
    private _dbContext = dbContext

    async execute(credentials: any): Promise<any> {
        const user = credentials.user
        const pass = credentials.pass

        const findByEmailQuery = `SELECT * from eltanin.usuario u WHERE u.tx_email = $1`
        const result = await this._dbContext.query(findByEmailQuery, [user])
        if(!(result?.length > 0)) return 401

        const resp = result[0]

        if(resp.tx_salt) {
            let key
            try{
                key = crypto.pbkdf2Sync(pass, resp.tx_salt, 100000, 32, 'sha256')
            } catch (err: any) {
                throw new Error('Could not authenticate')
            }

            if(resp.tx_senha !== key.toString('hex')) {
                throw new Error('Invalid credentials')
            }
        } else {
            if(resp.tx_senha !== pass) {
                throw new Error('Invalid credentials')
            }

            let salt = randomstring.generate(16)
            let key
            try{
                key = crypto.pbkdf2Sync(pass, salt, 100000, 32, 'sha256')
            } catch (err: any) {
                throw new Error('Could not authenticate')
            }

            const updateSaltQuery = `UPDATE eltanin.usuario SET tx_senha = $1, tx_salt = $2 WHERE id_usuario = $3`
            await this._dbContext.query(updateSaltQuery, [key.toString('hex'), salt, resp.id_usuario])
        }

        let newToken
        try{
            newToken = jwt.sign({ user: user }, 'secret', { expiresIn: 24*60*60 })
        } catch (err: any) {
            throw new Error('Could not authenticate')
        }

        const updateTokenQuery = `UPDATE eltanin.usuario SET cd_token = $1 WHERE id_usuario = $2`
        await this._dbContext.query(updateTokenQuery, [newToken, resp.id_usuario])
 
        return {name: resp.nome, idUser: resp.id_usuario, token: newToken}
    }
}