import { Router } from 'express'
import { signCheckController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const signCheckRouter = Router({ mergeParams: true });

signCheckRouter.post(
	`/`,
	controllerHandler(signCheckController)
);

export default signCheckRouter;