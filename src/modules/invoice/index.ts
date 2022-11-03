import { Router } from 'express'

const router = Router({mergeParams: true});

import invoiceRouter from './router/index'

router.use('/invoice', invoiceRouter);

export default router