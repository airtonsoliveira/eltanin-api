import { invoiceRepo } from '../model/index'

import GetInvoiceUseCase from './GetInvoiceUseCase'
import GetInvoiceByIdUseCase from './GetInvoiceByIdUseCase'

const getInvoiceUseCase = new GetInvoiceUseCase(invoiceRepo)
const getInvoiceByIdUseCase = new GetInvoiceByIdUseCase(invoiceRepo)

export {
    getInvoiceUseCase,
    getInvoiceByIdUseCase
}