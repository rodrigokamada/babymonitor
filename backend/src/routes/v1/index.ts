import { Router } from 'express';

import contacts from './contacts.route';
import health from './health.route';

const router = Router();

router.use('/contacts', contacts);
router.use('/health', health);

export default router;
