import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getInvoiceRouter'
import getById from './getInvoiceByIdRouter'

router.use('/:id', getById);
router.use('/', get);

export default router