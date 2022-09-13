import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const urlPath = req.url;
  console.debug(`path=[${urlPath}]`);

  if (urlPath.indexOf('/v1') > -1) {
    console.warn(`Path [${urlPath}] not found`);
    next(createError(404));
  } else {
    const url = `${req.protocol}://${req.get('host')}`;
    console.info(`Redirecting to the URL [${url}]`);
    res.redirect(url);
  }
});

// eslint-disable-next-line no-unused-vars
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`An error occurred: ${error}`);
  res.status(error.status || 500).send();
});

process.on('exit', (code: any) => {
  console.info(`About to exit with code: ${code}`);
});

const signalEvents = ['SIGINT', 'SIGTERM'];

signalEvents.forEach((event: any) => {
  process.on(event, () => {
    console.info('Caught interrupt signal');
    process.exit();
  });
});

export default app;
