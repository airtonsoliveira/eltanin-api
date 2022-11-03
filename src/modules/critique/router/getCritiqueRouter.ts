import { Router } from 'express'
import { getCritiqueController } from '../controller';
import controllerHandler from '../../../shared/middleware/controllerHandler'

const getCritiqueRouter = Router({mergeParams: true});

getCritiqueRouter.get(
	`/`,
	controllerHandler(getCritiqueController)
);

export default getCritiqueRouter;