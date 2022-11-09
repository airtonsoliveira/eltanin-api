import { Router } from 'express'
import { getDistributorController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const getDistributorRouter = Router({mergeParams: true});

getDistributorRouter.get(
	`/`,
	controllerHandler(getDistributorController)
);

export default getDistributorRouter;