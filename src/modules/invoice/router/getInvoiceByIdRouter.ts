import { Router } from 'express'
import { getInvoiceByIdController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const getInvoiceByIdRouter = Router({mergeParams: true});

getInvoiceByIdRouter.get(
	`/`,
	controllerHandler(getInvoiceByIdController)
);

export default getInvoiceByIdRouter;