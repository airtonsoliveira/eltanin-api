import { Router } from 'express'
import { getUserController } from '../controller';
import controllerHandler from '../../../shared/middleware/controllerHandler'

const getUserRouter = Router({mergeParams: true});

getUserRouter.get(
	`/`,
	controllerHandler(getUserController)
);

export default getUserRouter;