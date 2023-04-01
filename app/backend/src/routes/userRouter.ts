import { Router } from 'express';
import UserModel from '../database/models/UserModel';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import ValidateToken from '../middlewares/ValidateToken';

const router = Router();

const userService = new UserService(UserModel);
const userController = new UserController(userService);

router
  .post('/login', verifyRequiredFields('login'), userController.login)
  .get('/login/role', ValidateToken.verifyToken, userController.getRole);

export default router;
