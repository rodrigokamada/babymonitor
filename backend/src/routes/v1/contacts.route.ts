import { DataStore } from '@aws-amplify/datastore';
import config from 'config';
import createError from 'http-errors';
import got from 'got';
import { Request, Response, Router, NextFunction } from 'express';

import logger from '../../utils/logger';
import { ContactsModel } from '../../models';

const googleConfig: any = config.get('google');

const router = Router();

router.post('/send', async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  logger.info(`Sending the contact [${JSON.stringify(body)}]`);

  try {
    const url = `${googleConfig.recaptcha.url}?secret=${googleConfig.recaptcha.secretKey}&response=${body.token}`;
    logger.debug(`Requesting the [POST] method in the url [${url}]`);

    const response: any = await got.post(url, {
      responseType: 'json',
      resolveBodyOnly: true,
    });

    logger.debug(`Response [${JSON.stringify(response)}] from Google`);

    if (!response.success) {
      return next(createError(500));
    }
  } catch (error) {
    logger.error(`An error occurred while validating the Google token: ${error}`);
    return next(createError(500));
  }

  try {
    const contactModel = new ContactsModel({
      subject: body.subject,
      email: body.email,
      message: body.message,
    });

    logger.debug(`Inserting the contact [${JSON.stringify(contactModel)}]`);

    const contact = await DataStore.save(contactModel);

    logger.debug(`Contact [${JSON.stringify(contact)}] inserted`);

    return res.status(201).json(contact);
  } catch (error) {
    logger.error(`An error occurred while inserting the contact: ${error}`);
    return next(createError(500));
  }
});

export default router;
