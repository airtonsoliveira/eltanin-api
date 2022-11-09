import { Router } from 'express'

import auth from './auth'
import critique from './critique'
import distributor from './distributor'
import invoice from './invoice'
import unit from './unit'
import user from './user'

const router = Router({mergeParams: true})

router.get('/', (req, res) => {res.status(200).json({ info: 'Node.js, Express, and Postgres API' })})

router.use(auth);
router.use(critique);
router.use(distributor);
router.use(invoice);
router.use(unit);
router.use(user);

export default router