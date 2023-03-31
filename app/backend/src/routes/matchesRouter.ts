import { Router } from 'express';
import MatchModel from '../database/models/MatchModel';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchService = new MatchService(MatchModel);
const matchController = new MatchController(matchService);

router
  .get('/matches', matchController.getAll);

export default router;
