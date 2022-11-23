import { Router } from 'express'
import { postUnitController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const postUnitRouter = Router({mergeParams: true});

postUnitRouter.post(
	`/`,
	controllerHandler(postUnitController)
);

export default postUnitRouter;