import { Router } from 'express'

const router = Router({mergeParams: true});

import distributorRouter from './router/index'

router.use('/distributor', distributorRouter);

export default router