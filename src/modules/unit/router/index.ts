import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getUnitRouter'
import getById from './getUnitByIdRouter'
import post from './postUnitRouter'
import put from './putUnitRouter'

router.use('/:id', getById);
router.use('/:id', put);
router.use('/', get);
router.use('/', post)

export default router