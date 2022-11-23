import { Router } from 'express'
import { putUnitController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const putUnitRouter = Router({mergeParams: true});

putUnitRouter.put(
	`/`,
	controllerHandler(putUnitController)
);

export default putUnitRouter;