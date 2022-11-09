import { Router } from 'express'
import { getUnitController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const getUnitRouter = Router({mergeParams: true});

getUnitRouter.get(
	`/`,
	controllerHandler(getUnitController)
);

export default getUnitRouter;