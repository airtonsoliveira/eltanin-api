import { dbContext } from "@shared/database/DbContext";

import GetInvoiceItemTypeService from "./GetInvoiceItemTypeService";

const getInvoiceItemTypeService = new GetInvoiceItemTypeService(dbContext)

export {
    getInvoiceItemTypeService
}