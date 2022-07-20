import createError from 'http-errors';
import { Request, Response, Router, NextFunction } from 'express';

import authenticationMiddleware from '../../middlewares/authentication.middleware';
import logger from '../../utils/logger';
import { mysql } from '../../utils/mysql';
import { ViewersModel } from '../../models/viewers.model';

const router = Router();

router.post('/', authenticationMiddleware(), async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as any);

  let { monitor }: any = req.body;

  try {
    logger.debug(`Searching the monitor by code [${monitor.code}]`);

    monitor = await mysql.execute(`SELECT M.* FROM monitors M WHERE M.code = '${monitor.code}'`);

    if (monitor && monitor.length > 0) {
      monitor = monitor[0]; // eslint-disable-line prefer-destructuring
    }

    logger.debug(`Monitor [${JSON.stringify(monitor)}] found by code [${monitor.code}]`);

    const viewer = new ViewersModel(monitor.id, userId, undefined, undefined);

    logger.debug(`Inserting the viewer [${JSON.stringify(viewer)}]`);

    const result = await mysql.execute(`INSERT INTO viewers (id, monitor_id, user_id) VALUES ('${viewer.id}', '${viewer.monitorId}', '${viewer.userId}')`);

    logger.debug(`Viewer [${JSON.stringify(viewer)}] inserted: ${JSON.stringify(result)}`);

    return res.status(201).json(viewer);
  } catch (error) {
    logger.error(`An error occurred while inserting the viewer: ${error}`);
    return next(createError(500));
  }
});

export default router;
