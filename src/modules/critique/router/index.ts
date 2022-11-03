import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getCritiqueRouter'
import getById from './getCritiqueByIdRouter'

router.use('/:id', getById);
router.use('/', get);

export default router