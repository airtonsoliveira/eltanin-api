import { Router } from 'express'

const router = Router({mergeParams: true});

import critiqueRouter from './router'

router.use('/critique', critiqueRouter);

export default router