import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getCritiqueRouter'
import getById from './getCritiqueByIdRouter'
import getEvaluate from './getCritiqueEvaluateRouter'

router.use('/evaluate/:id', getEvaluate);
router.use('/:id', getById);
router.use('/', get);

export default router