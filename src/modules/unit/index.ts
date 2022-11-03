import { Router } from 'express'

const router = Router({mergeParams: true});

import unitRouter from './router'

router.use('/unit', unitRouter);

export default router