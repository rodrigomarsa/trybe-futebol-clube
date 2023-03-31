export interface IMatch {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchWithId extends IMatch {
  id: number;
}

export default interface IMatchService {
  getAll(): Promise<IMatchWithId[] | void>;
  getByProgress(inProgress: boolean): Promise<IMatchWithId[] | void>;
  updateProgress(id: number): Promise<void>;
}
