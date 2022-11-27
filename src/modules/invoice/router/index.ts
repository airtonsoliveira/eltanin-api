import { Router } from 'express'

const router = Router({mergeParams: true});

import get from './getInvoiceRouter'
import post from './postInvoiceRouter'
import put from './putInvoiceRouter'
import getById from './getInvoiceByIdRouter'
import getItemType from './getInvoiceItemTypeRouter'

router.use('/item', getItemType)
router.use('/:id', getById);
router.use('/:id', put);
router.use('/', post);
router.use('/', get);

export default router