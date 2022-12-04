import { dbContext } from "@shared/database/DbContext";

import GetInvoiceItemTypeService from "./GetInvoiceItemTypeService";
import GetInvoiceByFilterService from "./GetInvoiceByFilterService";

const getInvoiceItemTypeService = new GetInvoiceItemTypeService(dbContext)
const getInvoiceByFilterService = new GetInvoiceByFilterService(dbContext)

export {
    getInvoiceItemTypeService,
    getInvoiceByFilterService
}