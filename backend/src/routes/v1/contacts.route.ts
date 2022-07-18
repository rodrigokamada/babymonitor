import config from 'config';
import createError from 'http-errors';
import got from 'got';
import { Request, Response, Router, NextFunction } from 'express';

import logger from '../../utils/logger';
import { mysql } from '../../utils/mysql';
import { ContactsModel } from '../../models/contacts.model';

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
    const contact = new ContactsModel(body.subject, body.email, body.message);

    logger.debug(`Inserting the contact [${JSON.stringify(contact)}]`);

    const result = mysql.execute(`INSERT INTO contacts (id, subject, email, message) VALUES ('${contact.id}', '${contact.subject}', '${contact.email}', '${contact.message}')`);

    logger.debug(`Contact [${JSON.stringify(contact)}] inserted: ${result}`);

    return res.status(201).json(contact);
  } catch (error) {
    logger.error(`An error occurred while inserting the contact: ${error}`);
    return next(createError(500));
  }
});

export default router;
