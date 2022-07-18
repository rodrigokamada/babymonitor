import logger from '../utils/logger';
import { mysql } from '../utils/mysql';
import { ViewersModel } from '../models/viewers.model';

const update = async (viewer: ViewersModel): Promise<any> => {
  logger.debug(`Updating the viewer [${JSON.stringify(viewer)}] by monitorId [${viewer.monitorId}] and userId [${viewer.userId}]`);

  try {
    const result = await mysql.execute(`UPDATE viewers SET socket_id = '${viewer.socketId}', peer_id = '${viewer.peerId}' WHERE monitor_id = '${viewer.monitorId}' AND user_id = '${viewer.userId}'`);

    logger.debug(`Viewer [${JSON.stringify(viewer)}] updated by monitorId [${viewer.monitorId}] and userId [${viewer.userId}]`);

    return result;
  } catch (error) {
    logger.error(`An error occurred while updating the viewer [${JSON.stringify(viewer)}] by monitorId [${viewer.monitorId}] and userId [${viewer.userId}]: ${error}`);
    throw error;
  }
};

const getViewersByMonitorId = async (monitorId: string): Promise<any> => {
  logger.debug(`Searching the viewers by monitorId [${monitorId}]`);

  try {
    const viewers = await mysql.execute(`SELECT * FROM viewers WHERE monitor_id = '${monitorId}'`);

    logger.debug(`Viewers [${JSON.stringify(viewers)}] found by monitorId [${monitorId}]`);

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
