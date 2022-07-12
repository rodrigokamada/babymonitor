import createError from 'http-errors';
import { Request, Response, Router, NextFunction } from 'express';

import logger from '../../utils/logger';
import { mysql } from '../../utils/mysql';
import { MonitorsModel } from '../../models/monitors.model';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;

  try {
    const monitor = new MonitorsModel(userId);

    logger.debug(`Inserting the monitor [${JSON.stringify(monitor)}]`);

    const result = mysql.execute(`INSERT INTO monitors (id, code, user_id) VALUES ('${monitor.id}', '${monitor.code}', '${monitor.userId}')`);

    logger.debug(`Monitor [${JSON.stringify(monitor)}] inserted: ${result}`);

    return res.status(201).json(monitor);
  } catch(error) {
    logger.error(`An error occurred while inserting the monitor: ${error}`);
    return next(createError(500));
  }
});

export default router;
