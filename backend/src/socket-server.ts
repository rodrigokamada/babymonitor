import config from 'config';
import http from 'http';
import socketio from 'socket.io';

import logger from './utils/logger';

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
        socket.to(monitorId).emit('VIEW_CONNECT', userId);
      });
    });
  }

}
