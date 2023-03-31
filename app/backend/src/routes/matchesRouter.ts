import { Router } from 'express';
import MatchModel from '../database/models/MatchModel';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import ValidateToken from '../middlewares/ValidateToken';

const router = Router();

const matchService = new MatchService(MatchModel);
const matchController = new MatchController(matchService);

router
  .get('/matches', matchController.getAll)
  .patch('/matches/:id/finish', ValidateToken.verifyToken, matchController.updateProgress)
  .patch('/matches/:id', ValidateToken.verifyToken, matchController.updateScore);

export default router;
