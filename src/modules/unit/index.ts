import { Router } from 'express'

const router = Router({mergeParams: true});

import unitRouter from './router/index'

router.use('/unit', unitRouter);

export default router