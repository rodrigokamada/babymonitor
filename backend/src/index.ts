/* eslint-disable import/first */
process.env.NODE_CONFIG_DIR = `${__dirname}/../config`;
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import serverless from 'serverless-http';

import logger from './utils/logger';
import app from './app';

logger.info(`Starting the server`);
export const handler = serverless(app);
