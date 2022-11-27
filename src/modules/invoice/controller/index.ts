import {
    getInvoiceUseCase,
    getInvoiceByIdUseCase,
    getInvoiceItemTypeUseCase,
    postInvoiceUseCase,
    putInvoiceUseCase
} from '../use_case'

import GetInvoiceController from "./GetInvoiceController";
import GetInvoiceByIdController from "./GetInvoiceByIdController";
import GetInvoiceItemTypeController from "./GetInvoiceItemTypeController";
import PostInvoiceController from "./PostInvoiceController";
import PutInvoiceController from "./PutInvoiceController";

const getInvoiceController = new GetInvoiceController(getInvoiceUseCase)
const getInvoiceByIdController = new GetInvoiceByIdController(getInvoiceByIdUseCase)
const getInvoiceItemTypeController = new GetInvoiceItemTypeController(getInvoiceItemTypeUseCase)
const postInvoiceController = new PostInvoiceController(postInvoiceUseCase)
const putInvoiceController = new PutInvoiceController(putInvoiceUseCase)

export {
    getInvoiceController,
    getInvoiceByIdController,
    getInvoiceItemTypeController,
    postInvoiceController,
    putInvoiceController
}