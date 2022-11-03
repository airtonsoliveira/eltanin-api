import { Router } from 'express'

const router = Router({mergeParams: true});

import critiqueRouter from './router/index'

router.use('/critique', critiqueRouter);

export default router