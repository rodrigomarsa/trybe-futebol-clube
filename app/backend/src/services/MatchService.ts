import InvalidValueError from '../errors/InvalidValueError';
import NotFoundError from '../errors/NotFoundError';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';
import IMatchService, { IGoals, IMatch, IMatchWithId } from './interfaces/IMatchService';

export default class MatchService implements IMatchService {
  constructor(private _model = Matches, private _teamModel = Teams) {}

  async getAll(): Promise<IMatchWithId[] | void> {
    const matches = await this._model.findAll({ include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
    return matches;
  }

  async getByProgress(inProgress: boolean): Promise<IMatchWithId[] | void> {
    const filteredMatch = await this._model.findAll({ where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return filteredMatch;
  }

  async updateProgress(id: number): Promise<void> {
    await this._model.update({ inProgress: false }, { where: { id } });
  }

  async updateScore(id: number, data: IGoals): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = data;
    await this._model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(data: IMatch): Promise<IMatchWithId | void> {
    if (data.homeTeamId === data.awayTeamId) {
      throw new InvalidValueError('It is not possible to create a match with two equal teams');
    }
    const verifyHomeTeamId = await this._teamModel.findByPk(data.homeTeamId);
    const verifyAwayTeamId = await this._teamModel.findByPk(data.awayTeamId);
    if (!verifyHomeTeamId || !verifyAwayTeamId) {
      throw new NotFoundError('There is no team with such id!');
    }
    const newMatch = this._model.create({ ...data, inProgress: true });
    return newMatch;
  }
}
