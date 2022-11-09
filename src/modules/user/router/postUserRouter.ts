import { Router } from 'express'
import { postUserController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const postUserRouter = Router({mergeParams: true});

postUserRouter.post(
	`/`,
	controllerHandler(postUserController)
);

export default postUserRouter;