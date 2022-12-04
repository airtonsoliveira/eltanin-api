import { Router } from 'express'
import { delInvoiceController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const delInvoiceRouter = Router({mergeParams: true});

delInvoiceRouter.delete(
	`/`,
	controllerHandler(delInvoiceController)
);

export default delInvoiceRouter;