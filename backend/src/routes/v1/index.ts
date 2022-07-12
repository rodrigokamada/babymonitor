import { Router } from 'express';

import contacts from './contacts.route';
import users from './users.route';

const router = Router();

router.use('/contacts', contacts);
router.use('/users', users);

export default router;
