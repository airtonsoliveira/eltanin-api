import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getDistributorRouter'
import getById from './getDistributorByIdRouter'

router.use('/:id', getById);
router.use('/', get);

export default router