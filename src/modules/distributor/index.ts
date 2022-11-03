import { Router } from 'express'

const router = Router({mergeParams: true});

import distributorRouter from './router'

router.use('/distributor', distributorRouter);

export default router