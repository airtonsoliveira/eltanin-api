import { Router } from 'express'
import { getUserByIdController } from '../controller';
import controllerHandler from '../../../shared/middleware/controllerHandler'

const getUserByIdRouter = Router({mergeParams: true});

getUserByIdRouter.get(
	`/`,
	controllerHandler(getUserByIdController)
);

export default getUserByIdRouter;