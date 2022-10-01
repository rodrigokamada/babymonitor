import { DataStore } from '@aws-amplify/datastore';
import createError from 'http-errors';
import { Request, Response, Router, NextFunction } from 'express';

import authenticationMiddleware from '../../middlewares/authentication.middleware';
import logger from '../../utils/logger';
import { MonitorsModel, ViewersModel } from '../../models';
import utils from '../../utils/utils';

const router = Router();

router.get('/', authenticationMiddleware(), async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as any);

  const page = ((req.query.page || 1) as number) - 1;

  try {
    logger.debug(`Searching the monitors by userId [${userId}]`);

    const viewers = await DataStore.query(<any>ViewersModel, (viewer: any) => viewer.userId('eq', userId));

    logger.debug(`Found ${JSON.stringify(viewers)} viewers by userId [${userId}]`);

    const total = await DataStore.query(<any>MonitorsModel, (monitor: any) => monitor.id('contains', viewers));

    logger.debug(`Found ${JSON.stringify(total)} monitors`);

    const monitors = await DataStore.query(<any>ViewersModel, (viewer: any) => viewer.id('contains', viewers), { page, limit: 50 });

    logger.debug(`Found ${JSON.stringify(monitors)} monitors`);

    return res.status(200).json({
      total: total.length,
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

    const monitor = await DataStore.query(<any>MonitorsModel, id)

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
    const monitorModel = new MonitorsModel({
      code: utils.generateCode(),
      name: body.name,
    });

    logger.debug(`Inserting the monitor [${JSON.stringify(monitorModel)}]`);

    const monitor = await DataStore.save(monitorModel);

    logger.debug(`Monitor [${JSON.stringify(monitor)}] inserted`);

    const viewerModel = new ViewersModel({
      monitorId: monitor.id!,
      userId,
    });

    logger.debug(`Inserting the viewer [${JSON.stringify(viewerModel)}]`);

    const viewer = await DataStore.save(viewerModel);

    logger.debug(`Viewer [${JSON.stringify(viewer)}] inserted`);

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

    const monitorFound = await DataStore.query(<any>MonitorsModel, id);
    const monitor = await DataStore.save((<any>MonitorsModel).copyOf(monitorFound, (updated: any) => {
        updated.name = req.body.name;
      }),
    );

    logger.debug(`Monitor [${JSON.stringify(monitor)}] updated by id [${id}]`);

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

    const monitor = await DataStore.delete(<any>await DataStore.query(<any>MonitorsModel, id));

    logger.debug(`Monitor [${monitor}] deleted by id [${id}]`);

    logger.debug(`Deleting the viewers by monitorId [${id}]`);

    const viewers = await DataStore.delete(<any>MonitorsModel, (monitor: any) => monitor.monitorId('eq', id));

    logger.debug(`Viewers [${viewers}] deleted by id [${id}]`);

    return res.status(200).json();
  } catch (error) {
    logger.error(`An error occurred while deleting the monitor and the viewers by id [${id}]: ${error}`);
    return next(createError(500));
  }
});

export default router;
