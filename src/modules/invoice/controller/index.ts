import {
    getInvoiceUseCase,
    getInvoiceByIdUseCase
} from '../use_case'

import GetInvoiceController from "./GetInvoiceController";
import GetInvoiceByIdController from "./GetInvoiceByIdController";

const getInvoiceController = new GetInvoiceController(getInvoiceUseCase)
const getInvoiceByIdController = new GetInvoiceByIdController(getInvoiceByIdUseCase)

export {
    getInvoiceController,
    getInvoiceByIdController
}