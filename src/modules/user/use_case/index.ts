import { userRepo } from '../model'

import GetUserUseCase from './GetUserUseCase'
import GetUserByIdUseCase from './GetUserByIdUseCase'

const getUserUseCase = new GetUserUseCase(userRepo)
const getUserByIdUseCase = new GetUserByIdUseCase(userRepo)

export {
    getUserUseCase,
    getUserByIdUseCase
}