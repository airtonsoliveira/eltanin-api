import { unitRepo } from '../model'

import GetUnitUseCase from './GetUnitUseCase'
import GetUnitByIdUseCase from './GetUnitByIdUseCase'
import GetUnitByFilterUseCase from './GetUnitByFilterUseCase'

const getUnitUseCase = new GetUnitUseCase(unitRepo)
const getUnitByIdUseCase = new GetUnitByIdUseCase(unitRepo)
const getUnitByFilterUseCase = new GetUnitByFilterUseCase(unitRepo)

export {
    getUnitUseCase,
    getUnitByIdUseCase,
    getUnitByFilterUseCase
}