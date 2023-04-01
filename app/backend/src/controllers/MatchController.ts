import { Request, Response, NextFunction } from 'express';
import IMatchService from '../services/interfaces/IMatchService';
import IMatchController from './interfaces/IMatchController';

export default class MatchController implements IMatchController {
  matchService: IMatchService;

  constructor(matchService: IMatchService) {
    this.matchService = matchService;
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { inProgress } = req.query;
    try {
      let matches;
      if (inProgress) {
        matches = await this.matchService.getByProgress(inProgress === 'true');
      } else {
        matches = await this.matchService.getAll();
      }
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  updateProgress = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      await this.matchService.updateProgress(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  updateScore = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      await this.matchService.updateScore(Number(id), req.body);
      return res.status(200).json({ message: 'Score updated' });
    } catch (error) {
      next(error);
    }
  };

  createMatch = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const newMatch = await this.matchService.createMatch(req.body);
      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  };
}
