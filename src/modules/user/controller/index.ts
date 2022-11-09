import {
    getUserUseCase,
    getUserByIdUseCase,
    postUserUseCase,
    putUserUseCase
} from '../use_case'

import GetUserController from "./GetUserController";
import GetUserByIdController from "./GetUserByIdController";
import PostUserController from "./PostUserController";
import PutUserController from "./PutUserController";

const getUserController = new GetUserController(getUserUseCase)
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
const postUserController = new PostUserController(postUserUseCase)
const putUserController = new PutUserController(putUserUseCase)

export {
    getUserController,
    getUserByIdController,
    postUserController,
    putUserController
}