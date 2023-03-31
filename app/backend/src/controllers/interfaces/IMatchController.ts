import { NextFunction, Request, Response } from 'express';

export default interface IMatchController {
  getAll (req: Request, res: Response, next: NextFunction): Promise<Response | void>
  updateProgress (req: Request, res: Response, next: NextFunction): Promise<Response | void>
  updateScore (req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
