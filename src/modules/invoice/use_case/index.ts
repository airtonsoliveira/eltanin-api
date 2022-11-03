import { invoiceRepo } from '../model'

import GetInvoiceUseCase from './GetInvoiceUseCase'
import GetInvoiceByIdUseCase from './GetInvoiceByIdUseCase'

const getInvoiceUseCase = new GetInvoiceUseCase(invoiceRepo)
const getInvoiceByIdUseCase = new GetInvoiceByIdUseCase(invoiceRepo)

export {
    getInvoiceUseCase,
    getInvoiceByIdUseCase
}