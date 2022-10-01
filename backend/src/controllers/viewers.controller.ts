import { DataStore } from '@aws-amplify/datastore';
import logger from '../utils/logger';
import { ViewersModel } from '../models';

const update = async (viewer: any): Promise<any> => {
  logger.debug(`Updating the viewer [${JSON.stringify(viewer)}] by monitorId [${viewer.monitorId}] and userId [${viewer.userId}]`);

  let socketIds: String[] = [];

  try {
    const viewers = await DataStore.query(<any>ViewersModel, (viewer: any) => viewer.monitorId(viewer.monitorId).userId(viewer.userId));

    logger.debug(`Viewers ${JSON.stringify(viewers)} found by monitorId [${viewer.monitorId}] and userId [${viewer.userId}]`);

    if (viewers && viewers.length > 0 && viewers[0].socket_ids) {
      socketIds = socketIds.concat(viewers[0].socket_ids);
    }

    if (viewer.socketIds) {
      socketIds = socketIds.concat(viewer.socketIds);
    }

    const viewersFound = await DataStore.query(<any>ViewersModel, (viewer: any) => viewer.monitorId(viewer.monitorId).userId(viewer.userId));
    const viewersUpdate = await DataStore.save((<any>ViewersModel).copyOf(viewersFound, (updated: any) => {
        updated.socketIds = socketIds;
      }),
    );

    logger.debug(`Viewer [${JSON.stringify(viewersUpdate)}] updated by monitorId [${viewer.monitorId}] and userId [${viewer.userId}]`);

    return viewersUpdate;
  } catch (error) {
    logger.error(`An error occurred while updating the viewer [${JSON.stringify(viewer)}] by monitorId [${viewer.monitorId}] and userId [${viewer.userId}]: ${error}`);
    throw error;
  }
};

const getViewersByMonitorId = async (monitorId: string): Promise<any> => {
  logger.debug(`Searching the viewers by monitorId [${monitorId}]`);

  try {
    const viewers = await DataStore.query(<any>ViewersModel, (viewer: any) => viewer.monitorId(monitorId));

    logger.debug(`Viewers ${JSON.stringify(viewers)} found by monitorId [${monitorId}]`);

    return viewers;
  } catch (error) {
    logger.error(`An error occurred while searching the viewers by monitorId [${monitorId}]: ${error}`);
    throw error;
  }
};

export default {
  update,
  getViewersByMonitorId,
};
