import { CognitoJwtVerifier } from 'aws-jwt-verify';
import createError from 'http-errors';
import config from 'config';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import logger from '../utils/logger';

const verifier = CognitoJwtVerifier.create(config.get<any>('cognito'));

const authenticationMiddleware = (): RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    logger.warn('Parameter [authorization] not found in the header');
    return next(createError(401));
  }

  logger.debug(`Parameter [authorization] found in the header with the value [${req.headers.authorization}]`);

  try {
    let { authorization } = req.headers;
    if (authorization && authorization.toLowerCase().includes('bearer')) {
      authorization = authorization.split(' ')[1]; // eslint-disable-line prefer-destructuring
    }

    logger.debug(`JWT [${authorization}] from authorization`);

    const payload: any = await await verifier.verify(authorization, {} as any);

    logger.debug(`Payload [${JSON.stringify(payload)}] from JWT`);

    if (payload) {
      logger.debug(`Adding the userId [${payload.sub}] to the request`);

      (req as any).userId = payload.sub;

      return next();
    }

    logger.debug(`Key [${payload.sub}] not found in Redis`);
    return next(createError(401));
  } catch (error: any) {
    logger.error(`An error occurred while validation the authentication: ${error}`);
    if (error.constructor.name === 'JwtExpiredError') {
      return next(createError(401));
    }

    return next(createError(500));
  }
};

export default authenticationMiddleware;
