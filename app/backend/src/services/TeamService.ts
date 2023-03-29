import Teams from '../database/models/TeamModel';
import ITeamService, { TeamWithId } from './interfaces/ITeamService';

export default class TeamService implements ITeamService {
  constructor(private model = Teams) {}

  async getAll(): Promise<TeamWithId[] | void> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: string): Promise<TeamWithId | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
