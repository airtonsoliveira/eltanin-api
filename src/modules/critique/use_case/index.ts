import { critiqueRepo } from '../model/index'

import GetCritiqueUseCase from './GetCritiqueUseCase'
import GetCritiqueByIdUseCase from './GetCritiqueByIdUseCase'

const getCritiqueUseCase = new GetCritiqueUseCase(critiqueRepo)
const getCritiqueByIdUseCase = new GetCritiqueByIdUseCase(critiqueRepo)

export {
    getCritiqueUseCase,
    getCritiqueByIdUseCase
}