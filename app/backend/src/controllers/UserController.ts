import { Request, Response, NextFunction } from 'express';
import IUserService from '../services/interfaces/IUserService';
import IUserController from './interfaces/IUserController';

export default class UserController implements IUserController {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const login = req.body;
    try {
      const token = await this.userService.login(login);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  getRole = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const payload = req.user;
    try {
      return res.status(200).json({ role: payload.role });
    } catch (error) {
      next(error);
    }
  };
}
