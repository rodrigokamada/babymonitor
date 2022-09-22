import { Amplify } from 'aws-amplify';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createError from 'http-errors';
import express from 'express';
import * as expressWinston from 'express-winston';
import helmet from 'helmet';

import logger from './utils/logger';
import routes from './routes';

Amplify.configure(config.get('amplify'));

const app = express();
app.use(expressWinston.logger({ winstonInstance: logger }));
app.use(express.json());
app.use(cookieParser());

logger.info('Starting the CORS settings');
app.use(cors(config.get('cors')));

logger.info('Starting the Helmet settings');
app.use(helmet());

logger.info('Starting the routes');
app.use('/', routes);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const urlPath = req.url;
  logger.silly(`path=[${urlPath}]`);

  if (urlPath.indexOf('/v1') > -1) {
    logger.warn(`Path [${urlPath}] not found`);
    next(createError(404));
  } else {
    const url = `${req.protocol}://${req.get('host')}`;
    logger.info(`Redirecting to the URL [${url}]`);
    res.redirect(url);
  }
});

// eslint-disable-next-line no-unused-vars
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`An error occurred: ${error}`);
  res.status(error.status || 500).send();
});

process.on('exit', (code: any) => {
  logger.info(`About to exit with code: ${code}`);
});

const signalEvents = ['SIGINT', 'SIGTERM'];

signalEvents.forEach((event: any) => {
  process.on(event, () => {
    logger.info('Caught interrupt signal');
    process.exit();
  });
});

export default app;
