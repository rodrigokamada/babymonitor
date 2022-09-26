import { Router } from 'express';

import contacts from './contacts.route';
import health from './health.route';
import monitors from './monitors.route';

const router = Router();

router.use('/contacts', contacts);
router.use('/health', health);
router.use('/monitors', monitors);

export default router;
