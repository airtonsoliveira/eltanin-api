import { Router } from 'express'
import { putInvoiceController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const putInvoiceRouter = Router({mergeParams: true});

putInvoiceRouter.put(
	`/`,
	controllerHandler(putInvoiceController)
);

export default putInvoiceRouter;