import { Router } from 'express'
import { getUnitByIdController } from '../controller';
import controllerHandler from '../../../shared/middleware/controllerHandler'

const getUnitByIdRouter = Router({mergeParams: true});

getUnitByIdRouter.get(
	`/`,
	controllerHandler(getUnitByIdController)
);

export default getUnitByIdRouter;