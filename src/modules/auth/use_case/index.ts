import {
    signService,
    signCheckService
} from '../service'

import SignUseCase from './SignUseCase'
import SignCheckUseCase from './SignCheckUseCase'

const signUseCase = new SignUseCase(signService)
const signCheckUseCase = new SignCheckUseCase(signCheckService)

export {
    signUseCase,
    signCheckUseCase
}