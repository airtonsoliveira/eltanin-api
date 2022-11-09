import { Router } from 'express'
import { getDistributorByIdController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const getDistributorByIdRouter = Router({mergeParams: true});

getDistributorByIdRouter.get(
	`/`,
	controllerHandler(getDistributorByIdController)
);

export default getDistributorByIdRouter;