import {
    getUnitUseCase,
    getUnitByIdUseCase,
    postUnitUseCase,
    putUnitUseCase
} from '../use_case'

import GetUnitController from "./GetUnitController";
import GetUnitByIdController from "./GetUnitByIdController";
import PostUnitController from "./PostUnitController";
import PutUnitController from "./PutUnitController";

const getUnitController = new GetUnitController(getUnitUseCase)
const getUnitByIdController = new GetUnitByIdController(getUnitByIdUseCase)
const postUnitController = new PostUnitController(postUnitUseCase)
const putUnitController = new PutUnitController(putUnitUseCase)

export {
    getUnitController,
    getUnitByIdController,
    postUnitController,
    putUnitController
}