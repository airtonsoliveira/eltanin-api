import {
    getUnitUseCase,
    getUnitByIdUseCase
} from '../use_case'

import GetUnitController from "./GetUnitController";
import GetUnitByIdController from "./GetUnitByIdController";

const getUnitController = new GetUnitController(getUnitUseCase)
const getUnitByIdController = new GetUnitByIdController(getUnitByIdUseCase)

export {
    getUnitController,
    getUnitByIdController
}