import { Router } from 'express'

const router = Router({mergeParams: true});

import userRouter from './router'

router.use('/user', userRouter);

export default router