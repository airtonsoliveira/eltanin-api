import {
    signUseCase,
    signCheckUseCase
} from '../use_case'

import SignController from "./SignController";
import SignCheckController from "./SignCheckController";

const signController = new SignController(signUseCase)
const signCheckController = new SignCheckController(signCheckUseCase)

export {
    signController,
    signCheckController,
}