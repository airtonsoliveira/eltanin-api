import { Router } from 'express'
import { getCritiqueByIdController } from '../controller';
import controllerHandler from '../../../shared/middleware/controllerHandler'

const getCritiqueByIdRouter = Router({mergeParams: true});

getCritiqueByIdRouter.get(
	`/`,
	controllerHandler(getCritiqueByIdController)
);

export default getCritiqueByIdRouter;