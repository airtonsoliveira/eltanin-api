import {
    getUserUseCase,
    getUserByIdUseCase
} from '../use_case/index'

import GetUserController from "./GetUserController";
import GetUserByIdController from "./GetUserByIdController";

const getUserController = new GetUserController(getUserUseCase)
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

export {
    getUserController,
    getUserByIdController
}