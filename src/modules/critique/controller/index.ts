import {
    getCritiqueUseCase,
    getCritiqueByIdUseCase,
    getCritiqueEvaluateUseCase
} from '../use_case'

import GetCritiqueController from "./GetCritiqueController";
import GetCritiqueByIdController from "./GetCritiqueByIdController";
import GetCritiqueEvaluateController from "./GetCritiqueEvaluateController";

const getCritiqueController = new GetCritiqueController(getCritiqueUseCase)
const getCritiqueByIdController = new GetCritiqueByIdController(getCritiqueByIdUseCase)
const getCritiqueEvaluateController = new GetCritiqueEvaluateController(getCritiqueEvaluateUseCase)


export {
    getCritiqueController,
    getCritiqueByIdController,
    getCritiqueEvaluateController    
}