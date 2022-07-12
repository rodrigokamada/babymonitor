import { Router } from 'express';

import contacts from './contacts.route';

const router = Router();

router.use('/contacts', contacts);

export default router;
