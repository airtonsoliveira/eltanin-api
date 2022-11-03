import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getUserRouter'
import getById from './getUserByIdRouter'

router.use('/:id', getById);
router.use('/', get);

export default router