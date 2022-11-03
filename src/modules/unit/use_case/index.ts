import { unitRepo } from '../model/index'

import GetUnitUseCase from './GetUnitUseCase'
import GetUnitByIdUseCase from './GetUnitByIdUseCase'

const getUnitUseCase = new GetUnitUseCase(unitRepo)
const getUnitByIdUseCase = new GetUnitByIdUseCase(unitRepo)

export {
    getUnitUseCase,
    getUnitByIdUseCase
}