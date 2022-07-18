import { Router } from 'express';

import contacts from './contacts.route';
import monitors from './monitors.route';
import users from './users.route';
import viewers from './viewers.route';

const router = Router();

router.use('/contacts', contacts);
router.use('/monitors', monitors);
router.use('/users', users);
router.use('/viewers', viewers);

export default router;
