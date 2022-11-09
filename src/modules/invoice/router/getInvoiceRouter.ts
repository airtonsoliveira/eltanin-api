import { Router } from 'express'
import { getInvoiceController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const getInvoiceRouter = Router({mergeParams: true});

getInvoiceRouter.get(
	`/`,
	controllerHandler(getInvoiceController)
);

export default getInvoiceRouter;