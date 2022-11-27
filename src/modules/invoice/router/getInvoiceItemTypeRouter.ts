import { Router } from 'express'
import { getInvoiceItemTypeController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const getInvoiceItemTypeRouter = Router({mergeParams: true});

getInvoiceItemTypeRouter.get(
	`/`,
	controllerHandler(getInvoiceItemTypeController)
);

export default getInvoiceItemTypeRouter;