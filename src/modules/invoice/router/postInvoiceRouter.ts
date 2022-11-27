import { Router } from 'express'
import { postInvoiceController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const postInvoiceRouter = Router({mergeParams: true});

postInvoiceRouter.post(
	`/`,
	controllerHandler(postInvoiceController)
);

export default postInvoiceRouter;