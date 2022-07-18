import createError from 'http-errors';
import { Request, Response, Router, NextFunction } from 'express';

import authenticationMiddleware from '../../middlewares/authentication.middleware';
import logger from '../../utils/logger';
import { mysql } from '../../utils/mysql';
import { MonitorsModel } from '../../models/monitors.model';
import { ViewersModel } from '../../models/viewers.model';

const router = Router();

router.get('/', authenticationMiddleware(), async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as any);

  const size = 50;
  const offset = (((req.query.page || 1) as number) - 1) * size;

  try {
    logger.debug(`Searching the monitors by userId [${userId}]`);

    const total = await mysql.execute(`SELECT COUNT(*) AS total FROM monitors M INNER JOIN viewers V ON V.monitor_id = M.id WHERE V.user_id = '${userId}'`);
    logger.debug('total:', total);

    const monitors = await mysql.execute(`SELECT M.*, M.user_id = V.user_id FROM monitors M INNER JOIN viewers V ON V.monitor_id = M.id WHERE V.user_id = '${userId}' LIMIT ${offset}, ${size}`);
    logger.debug('monitors:', monitors);

    return res.status(200).json({
      total: total && total.length > 0 ? total[0].total : 0,
      monitors,
    });
  } catch (error) {
    logger.error(`An error occurred while searching the monitors: ${error}`);
    return next(createError(500));
  }
});

router.get('/:id', authenticationMiddleware(), async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    logger.info(`Searching the monitor by id [${id}]`);

    const monitor = await mysql.execute(`SELECT * FROM monitors WHERE id = '${id}'`);

    logger.debug(`Found [${JSON.stringify(monitor)}] monitor by id [${id}]`);

    return res.status(200).json(monitor && monitor.length > 0 ? monitor[0] : {});
  } catch (error) {
    logger.error(`An error occurred while searching the monitor by id [${id}]: ${error}`);
    return next(createError(500));
  }
});

router.post('/', authenticationMiddleware(), async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as any);

  const { body } = req;

  try {
    const monitor = new MonitorsModel(body.name);

    logger.debug(`Inserting the monitor [${JSON.stringify(monitor)}]`);

    const resultMonitor = await mysql.execute(`INSERT INTO monitors (id, code, name) VALUES ('${monitor.id}', '${monitor.code}', '${monitor.name}')`);

    logger.debug(`Monitor [${JSON.stringify(monitor)}] inserted: ${resultMonitor}`);

    const viewer = new ViewersModel(monitor.id!, userId, undefined, undefined);

    logger.debug(`Inserting the viewer [${JSON.stringify(viewer)}]`);

    const resultViewer = await mysql.execute(`INSERT INTO viewers (id, monitor_id, user_id) VALUES ('${viewer.id}', '${viewer.monitorId}', '${viewer.userId}')`);

    logger.debug(`Viewer [${JSON.stringify(viewer)}] inserted: ${resultViewer}`);

    return res.status(201).json(monitor);
  } catch (error) {
    logger.error(`An error occurred while inserting the monitor or the viewer: ${error}`);
    return next(createError(500));
  }
});

router.put('/:id', authenticationMiddleware(), async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    logger.debug(`Updating the monitor by id [${id}]`);

    const result = await mysql.execute(`UPDATE monitors SET name = '${req.body.name}' WHERE id = '${id}')`);

    logger.debug(`Monitor updated by id [${id}]`);

    return res.status(200).json();
  } catch (error) {
    logger.error(`An error occurred while updating the monitor by id [${id}]: ${error}`);
    return next(createError(500));
  }
});

router.delete('/:id', authenticationMiddleware(), async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    logger.debug(`Deleting the monitor by id [${id}]`);

    const monitor = await mysql.execute(`DELETE FROM monitors WHERE id = '${id}'`);

    logger.debug(`Monitor [${monitor}] deleted by id [${id}]`);

    logger.debug(`Deleting the viewers by monitorId [${id}]`);

    const viewers = await mysql.execute(`DELETE FROM viewers WHERE monitor_id = '${id}'`);

    logger.debug(`Viewers [${viewers}] deleted by id [${id}]`);

    return res.status(200).json();
  } catch (error) {
    logger.error(`An error occurred while deleting the monitor and the viewers by id [${id}]: ${error}`);
    return next(createError(500));
  }
});

export default router;
