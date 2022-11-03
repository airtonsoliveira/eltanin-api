import {
    getCritiqueUseCase,
    getCritiqueByIdUseCase
} from '../use_case'

import GetCritiqueController from "./GetCritiqueController";
import GetCritiqueByIdController from "./GetCritiqueByIdController";

const getCritiqueController = new GetCritiqueController(getCritiqueUseCase)
const getCritiqueByIdController = new GetCritiqueByIdController(getCritiqueByIdUseCase)

export {
    getCritiqueController,
    getCritiqueByIdController
}