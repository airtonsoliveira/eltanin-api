import { distributorRepo } from '../model'

import GetDistributorUseCase from './GetDistributorUseCase'
import GetDistributorByIdUseCase from './GetDistributorByIdUseCase'

const getDistributorUseCase = new GetDistributorUseCase(distributorRepo)
const getDistributorByIdUseCase = new GetDistributorByIdUseCase(distributorRepo)

export {
    getDistributorUseCase,
    getDistributorByIdUseCase
}