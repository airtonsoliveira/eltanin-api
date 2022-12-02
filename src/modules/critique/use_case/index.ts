import { critiqueRepo } from '../model'
import { getCritiqueEvaluateService } from '../service'

import GetCritiqueUseCase from './GetCritiqueUseCase'
import GetCritiqueByIdUseCase from './GetCritiqueByIdUseCase'
import GetCritiqueEvaluateUseCase from './GetCritiqueEvaluateUseCase'

const getCritiqueUseCase = new GetCritiqueUseCase(critiqueRepo)
const getCritiqueByIdUseCase = new GetCritiqueByIdUseCase(critiqueRepo)
const getCritiqueEvaluateUseCase = new GetCritiqueEvaluateUseCase(getCritiqueEvaluateService)

export {
    getCritiqueUseCase,
    getCritiqueByIdUseCase,
    getCritiqueEvaluateUseCase
}