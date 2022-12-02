import { Router } from 'express'
import { getCritiqueEvaluateController } from '../controller';
import controllerHandler from '@shared/middleware/controllerHandler'

const getCritiquedEvaluateRouter = Router({mergeParams: true});

getCritiquedEvaluateRouter.get(
	`/`,
	controllerHandler(getCritiqueEvaluateController)
);

export default getCritiquedEvaluateRouter;