import { unitRepo } from '../model'

import GetUnitUseCase from './GetUnitUseCase'
import GetUnitByIdUseCase from './GetUnitByIdUseCase'
import GetUnitByFilterUseCase from './GetUnitByFilterUseCase'
import PostUnitUseCase from './PostUnitUseCase'
import PutUnitUseCase from './PutUnitUseCase'

const getUnitUseCase = new GetUnitUseCase(unitRepo)
const getUnitByIdUseCase = new GetUnitByIdUseCase(unitRepo)
const getUnitByFilterUseCase = new GetUnitByFilterUseCase(unitRepo)
const postUnitUseCase = new PostUnitUseCase(unitRepo)
const putUnitUseCase = new PutUnitUseCase(unitRepo)

export {
    getUnitUseCase,
    getUnitByIdUseCase,
    getUnitByFilterUseCase,
    postUnitUseCase,
    putUnitUseCase
}