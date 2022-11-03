import {
    getDistributorUseCase,
    getDistributorByIdUseCase
} from '../use_case/index'

import GetDistributorController from "./GetDistributorController";
import GetDistributorByIdController from "./GetDistributorByIdController";

const getDistributorController = new GetDistributorController(getDistributorUseCase)
const getDistributorByIdController = new GetDistributorByIdController(getDistributorByIdUseCase)

export {
    getDistributorController,
    getDistributorByIdController
}