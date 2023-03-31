import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';
import IMatchService, { IMatchWithId } from './interfaces/IMatchService';

export default class MatchService implements IMatchService {
  constructor(private model = Matches) {}

  async getAll(): Promise<IMatchWithId[] | void> {
    const matches = await this.model.findAll({ include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
    return matches;
  }

  async getByProgress(inProgress: boolean): Promise<IMatchWithId[] | void> {
    const filteredMatch = await this.model.findAll({ where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return filteredMatch;
  }

  async updateProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateScore(id: number, data:
  { homeTeamGoals: number; awayTeamGoals: number; }): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = data;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
