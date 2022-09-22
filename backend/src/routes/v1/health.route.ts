import config from 'config';
import createError from 'http-errors';
import got from 'got';
import { Request, Response, Router, NextFunction } from 'express';

import logger from '../../utils/logger';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const health: any = {
    uptime: process.uptime(),
    date: new Date(),
  };

  logger.debug(`Health [${JSON.stringify(health)}]`);

  return res.status(200).json(health);
});

export default router;
