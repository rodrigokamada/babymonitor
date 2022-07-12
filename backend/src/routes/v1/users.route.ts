import createError from 'http-errors';
import { Request, Response, Router, NextFunction } from 'express';

import logger from '../../utils/logger';
import { mysql } from '../../utils/mysql';
import { UsersModel } from '../../models/users.model';

const router = Router();

export default router;
