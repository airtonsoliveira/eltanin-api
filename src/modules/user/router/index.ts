import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getUserRouter'
import getById from './getUserByIdRouter'
import post from './postUserRouter'
import put from './putUserRouter'

router.use('/:id', getById);
router.use('/', get);
router.use('/', post);
router.use('/', put);

export default router