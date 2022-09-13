/* eslint-disable import/first */
process.env.NODE_CONFIG_DIR = `${__dirname}/../config`;
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import config from 'config';
import http from 'http';

import app from './app';

const applicationConfig: any = config.get('application');
const peerConfig: any = config.get('peer');

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(applicationConfig.port);
app.set('port', port);

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

console.info(`Starting the server on the port [${port}]`);
const server = http.createServer(app);

function onListening() {
  const addr: any = server.address();
  const bind: any = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
