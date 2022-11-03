import { Router } from 'express'

import critique from './critique/index'
import distributor from './distributor/index'
import invoice from './invoice/index'
import unit from './unit/index'
import user from './user/index'

const router = Router({mergeParams: true})

router.get('/', (req, res) => {res.status(200).json({ info: 'Node.js, Express, and Postgres API' })})

router.use(critique);
router.use(distributor);
router.use(invoice);
router.use(unit);
router.use(user);

export default router