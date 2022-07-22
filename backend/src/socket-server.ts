import config from 'config';
import http from 'http';
import socketio from 'socket.io';

import logger from './utils/logger';
import viewersController from './controllers/viewers.controller';
import { ViewersModel } from './models/viewers.model';

const socketConfig: any = config.get('socket');

export class SocketServer {

  socketServer: any;

  constructor(httpServer: http.Server) {
    logger.info('Creating the socket');
    this.socketServer = new socketio.Server(httpServer, socketConfig);
  }

  public init(): void {
    logger.info('Starting the socket');

    this.socketServer.on('connection', (socket: socketio.Socket) => {
      logger.info(`Socket id [${socket.id}] connected`);

      socket.on('disconnect', () => {
        logger.info(`Socket id [${socket.id}] disconnected`);
      });

      socket.on('VIEW_OPEN', async (monitorId: string, userId: string, peerId: string) => {
        logger.debug(`View opened to monitorId [${monitorId}], userId [${userId}] and peerId [${peerId}]`);

        const viewer = new ViewersModel(monitorId, userId, socket.id, peerId);
        await viewersController.update(viewer);

        try {
          const viewers = await viewersController.getViewersByMonitorId(monitorId);
          if (viewers && viewers.length > 0) {
            for (const v of viewers) {
              if (v.socket_id === socket.id) {
                logger.debug(`Skipping the event [VIEW_CONNECT] to [${v.socket_id}] with monitorId [${monitorId}] and peerId [${peerId}]`);
                continue;
              }

              logger.debug(`Emitting the event [VIEW_CONNECT] to [${v.socket_id}] with monitorId [${monitorId}] and peerId [${peerId}]`);
              socket.to(v.socket_id).emit('VIEW_CONNECT', v.monitor_id, peerId);
            }
          }
        } catch (error) {
          logger.error(`An error occurred while emitting the viewers connected: ${error}`);
        }
      });
    });
  }

}
