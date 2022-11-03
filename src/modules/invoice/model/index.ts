import { dbContext } from "../../../shared/database/DbContext";
import { InvoiceRepo } from "./InvoiceRepo";

const invoiceRepo = new InvoiceRepo(dbContext)

export {
    invoiceRepo
}