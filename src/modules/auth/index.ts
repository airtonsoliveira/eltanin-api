import { Router } from 'express'

const router = Router({ mergeParams: true });

import authRouter from './router'

router.use('/sign', authRouter);

export default router