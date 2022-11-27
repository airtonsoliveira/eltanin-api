import { invoiceRepo } from '../model'
import { getInvoiceItemTypeService } from '../service'

import GetInvoiceUseCase from './GetInvoiceUseCase'
import GetInvoiceByIdUseCase from './GetInvoiceByIdUseCase'
import GetInvoiceItemTypeUseCase from './GetInvoiceItemTypeUseCase'
import PostInvoiceUseCase from './PostInvoiceUseCase'
import PutInvoiceUseCase from './PutInvoiceUseCase'

const getInvoiceUseCase = new GetInvoiceUseCase(invoiceRepo)
const getInvoiceByIdUseCase = new GetInvoiceByIdUseCase(invoiceRepo)
const getInvoiceItemTypeUseCase = new GetInvoiceItemTypeUseCase(getInvoiceItemTypeService)
const postInvoiceUseCase = new PostInvoiceUseCase(invoiceRepo)
const putInvoiceUseCase = new PutInvoiceUseCase(invoiceRepo)

export {
    getInvoiceUseCase,
    getInvoiceByIdUseCase,
    getInvoiceItemTypeUseCase,
    postInvoiceUseCase,
    putInvoiceUseCase
}