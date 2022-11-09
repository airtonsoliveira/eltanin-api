import { Router } from 'express'
import { putUserController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const putUserRouter = Router({mergeParams: true});

putUserRouter.put(
	`/`,
	controllerHandler(putUserController)
);

export default putUserRouter;