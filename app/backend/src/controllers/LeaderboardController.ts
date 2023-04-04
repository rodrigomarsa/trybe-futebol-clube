import { Request, Response, NextFunction } from 'express';
import ILeaderboardService from '../services/interfaces/ILeaderboardService';
import ILeaderboardController from './interfaces/ILeaderboardController';

export default class LeaderboardController implements ILeaderboardController {
  leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  getHomeInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const teamsHome = await this.leaderboardService.getHomeInfo();
      return res.status(200).json(teamsHome);
    } catch (error) {
      next(error);
    }
  };

  getAwayInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const teamsAway = await this.leaderboardService.getAwayInfo();
      return res.status(200).json(teamsAway);
    } catch (error) {
      next(error);
    }
  };

  getAllInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const teams = await this.leaderboardService.getAllInfo();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
