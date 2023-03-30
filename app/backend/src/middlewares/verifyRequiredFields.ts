import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/BadRequestError';

const requestRequiredFields = {
  user: ['username', 'email', 'password'],
  login: ['email', 'password'],
};

const verifyRequiredFields = (key: keyof typeof requestRequiredFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[key];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) {
        throw new BadRequestError('All fields must be filled');
      }
    }

    next();
  };

export default verifyRequiredFields;
