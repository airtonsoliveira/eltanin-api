import { Router } from 'express'

const router = Router({mergeParams: true});

import userRouter from './router/index'

router.use('/user', userRouter);

export default router