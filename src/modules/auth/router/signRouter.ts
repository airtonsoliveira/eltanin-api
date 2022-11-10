import { Router } from 'express'
import { signController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const signRouter = Router({ mergeParams: true });

signRouter.post(
	`/`,
	controllerHandler(signController)
);

export default signRouter;