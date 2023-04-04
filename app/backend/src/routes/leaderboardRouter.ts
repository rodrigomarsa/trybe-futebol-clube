import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const router = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

router
  .get('/leaderboard/home', leaderboardController.getHomeInfo)
  .get('/leaderboard/away', leaderboardController.getAwayInfo)
  .get('/leaderboard', leaderboardController.getAllInfo);

export default router;
