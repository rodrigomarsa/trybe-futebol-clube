import { NextFunction, Request, Response, Router } from 'express';
import UserModel from '../database/models/UserModel';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import ValidateToken from '../middlewares/ValidateToken';

const router = Router();

const userService = new UserService(UserModel);
const userController = new UserController(userService);
// const validateToken = new ValidateToken();

router
  .post('/login', verifyRequiredFields('login'), userController.login)
  .get(
    '/login/role',
    (req: Request, res: Response, next: NextFunction) => ValidateToken.verifyToken(req, res, next),
    userController.getRole,
  );

export default router;
