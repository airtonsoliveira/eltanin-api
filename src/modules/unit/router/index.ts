import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getUnitRouter'
import getById from './getUnitByIdRouter'

router.use('/:id', getById);
router.use('/', get);

export default router