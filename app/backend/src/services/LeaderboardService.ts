import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import ILeaderboardService, { ILeaderboard } from './interfaces/ILeaderboardService';

const queryHome = `SELECT 
    t.team_name AS name,
    ((SUM(m.home_team_goals > m.away_team_goals) * 3) + 
    SUM(m.home_team_goals = m.away_team_goals) * 1) AS totalPoints,
    COUNT(m.home_team_id) AS totalGames,
    SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
    SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
    SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn,
    SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance,
    ROUND(((((SUM(m.home_team_goals > m.away_team_goals) * 3) + 
    SUM(m.home_team_goals = m.away_team_goals) * 1) /
    (COUNT(m.home_team_id) * 3)) * 100), 2) AS efficiency
FROM
    TRYBE_FUTEBOL_CLUBE.teams AS t
INNER JOIN
    TRYBE_FUTEBOL_CLUBE.matches AS m ON t.id = m.home_team_id
WHERE
    m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalVictories , goalsBalance , goalsFavor;`;

export default class LeaderboardService implements ILeaderboardService {
  constructor(private _model = sequelize) {}

  async getHomeInfo(): Promise<ILeaderboard[] | void> {
    const teams = await this._model.query(queryHome, { type: QueryTypes.SELECT });
    return teams as ILeaderboard[];
  }
}
