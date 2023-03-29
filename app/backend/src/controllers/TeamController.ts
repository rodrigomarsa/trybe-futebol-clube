import { Request, Response, NextFunction } from 'express';
import ITeamService from '../services/interfaces/ITeamService';
import ITeamController from './interfaces/ITeamController';

export default class TeamController implements ITeamController {
  teamService: ITeamService;

  constructor(teamService: ITeamService) {
    this.teamService = teamService;
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const teams = await this.teamService.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const team = await this.teamService.getById(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
