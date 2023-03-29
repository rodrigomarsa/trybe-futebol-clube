import { Router } from 'express';
import TeamModel from '../database/models/TeamModel';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const router = Router();

const teamService = new TeamService(TeamModel);
const teamController = new TeamController(teamService);

router
  .get('/teams', teamController.getAll)
  .get('/teams/:id', teamController.getById);

export default router;
