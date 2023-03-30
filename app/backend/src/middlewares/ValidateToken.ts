import { Request, Response, NextFunction } from 'express';
import { IUser } from '../services/interfaces/IUserService';
import authFunctions from '../utils/authFunctions';

declare module 'express-serve-static-core' {
  interface Request {
    user: Omit<IUser, 'password' | 'email'>
  }
}

export default class ValidateToken {
  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'Token not found' });
      const decoded = authFunctions.verifyJwt(authorization);
      req.user = decoded as Omit<IUser, 'password' | 'email'>;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
