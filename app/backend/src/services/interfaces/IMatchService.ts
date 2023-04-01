export interface IGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends IGoals {
  homeTeamId: number;
  awayTeamId: number;
  inProgress: boolean;
}

export interface IMatchWithId extends IMatch {
  id: number;
}

export default interface IMatchService {
  getAll(): Promise<IMatchWithId[] | void>;
  getByProgress(inProgress: boolean): Promise<IMatchWithId[] | void>;
  updateProgress(id: number): Promise<void>;
  updateScore(id: number, data: IGoals): Promise<void>;
  createMatch(data: IMatch): Promise<IMatchWithId | void>
}
