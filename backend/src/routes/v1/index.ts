import { Router } from 'express';

import contacts from './contacts.route';
import monitors from './monitors.route';
import users from './users.route';

const router = Router();

router.use('/contacts', contacts);
router.use('/monitors', monitors);
router.use('/users', users);

export default router;
