import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import ILeaderboardService, { ILeaderboard } from './interfaces/ILeaderboardService';
import { queryAway, queryHome } from './querys/querys';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private _model = sequelize) {}

  async getHomeInfo(): Promise<ILeaderboard[] | void> {
    const teams = await this._model.query(queryHome, { type: QueryTypes.SELECT });
    return teams as ILeaderboard[];
  }

  async getAwayInfo(): Promise<ILeaderboard[] | void> {
    const teams = await this._model.query(queryAway, { type: QueryTypes.SELECT });
    return teams as ILeaderboard[];
  }
}
