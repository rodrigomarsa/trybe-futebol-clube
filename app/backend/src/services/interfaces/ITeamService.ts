export interface ITeam {
  teamName: string;
}

export interface ITeamWithId extends ITeam {
  id: number;
}

export default interface ITeamService {
  getAll(): Promise<ITeamWithId[] | void>;
  getById(id: string): Promise<ITeamWithId | null>;
}
