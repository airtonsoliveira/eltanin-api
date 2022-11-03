import { Router } from 'express'

const router = Router({mergeParams: true});

import invoiceRouter from './router'

router.use('/invoice', invoiceRouter);

export default router