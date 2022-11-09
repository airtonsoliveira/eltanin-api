import { Router } from 'express'

const router = Router({mergeParams: true});

import sign from './signRouter'
import signCheck from './signCheckRouter'

router.use('/', sign);
router.use('/check', signCheck);

export default router