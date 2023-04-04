import { NextFunction, Request, Response } from 'express';

export default interface ILeaderboardController {
  getHomeInfo (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getAwayInfo (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getAllInfo (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
