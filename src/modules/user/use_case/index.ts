import { userRepo } from '../model'

import GetUserUseCase from './GetUserUseCase'
import GetUserByIdUseCase from './GetUserByIdUseCase'
import PostUserUseCase from './PostUserUseCase'
import PutUserUseCase from './PutUserUseCase'

const getUserUseCase = new GetUserUseCase(userRepo)
const getUserByIdUseCase = new GetUserByIdUseCase(userRepo)
const postUserUseCase = new PostUserUseCase(userRepo)
const putUserUseCase = new PutUserUseCase(userRepo)

export {
    getUserUseCase,
    getUserByIdUseCase,
    postUserUseCase,
    putUserUseCase
}