import Teams from '../database/models/TeamModel';
import ITeamService, { ITeamWithId } from './interfaces/ITeamService';

export default class TeamService implements ITeamService {
  constructor(private model = Teams) {}

  async getAll(): Promise<ITeamWithId[] | void> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: string): Promise<ITeamWithId | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
