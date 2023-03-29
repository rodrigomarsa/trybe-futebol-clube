export interface Team {
  teamName: string;
}

export interface TeamWithId extends Team {
  id: number;
}

export default interface ITeamService {
  getAll(): Promise<TeamWithId[] | void>;
  getById(id: string): Promise<TeamWithId | null>;
}
