import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import ILeaderboardService, { ILeaderboard } from './interfaces/ILeaderboardService';
import { queryAway, queryHome } from './querys/querys';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private _model = sequelize) {}

  async getHomeInfo(): Promise<ILeaderboard[] | void> {
    const teamsHome = await this._model.query(queryHome, { type: QueryTypes.SELECT });
    return teamsHome as ILeaderboard[];
  }

  async getAwayInfo(): Promise<ILeaderboard[] | void> {
    const teamsAway = await this._model.query(queryAway, { type: QueryTypes.SELECT });
    return teamsAway as ILeaderboard[];
  }

  static updateTeams(teamHome: ILeaderboard, teamAway: ILeaderboard) {
    const teamUpdated = {} as unknown as ILeaderboard;
    teamUpdated.name = teamHome.name;
    teamUpdated.totalPoints = Number(teamHome.totalPoints) + Number(teamAway.totalPoints);
    teamUpdated.totalGames = Number(teamHome.totalGames) + Number(teamAway.totalGames);
    teamUpdated.totalVictories = Number(teamHome.totalVictories)
    + Number(teamAway.totalVictories);
    teamUpdated.totalDraws = Number(teamHome.totalDraws) + Number(teamAway.totalDraws);
    teamUpdated.totalLosses = Number(teamHome.totalLosses) + Number(teamAway.totalLosses);
    teamUpdated.goalsFavor = Number(teamHome.goalsFavor) + Number(teamAway.goalsFavor);
    teamUpdated.goalsOwn = Number(teamHome.goalsOwn) + Number(teamAway.goalsOwn);
    teamUpdated.goalsBalance = teamUpdated.goalsFavor - teamUpdated.goalsOwn;
    teamUpdated.efficiency = +((teamUpdated.totalPoints
    / (teamUpdated.totalGames * 3)) * 100).toFixed(2);
    return teamUpdated;
  }

  static orderLeaderboard(teams: ILeaderboard[]) {
    teams.sort((a, b) => (b.totalPoints - a.totalPoints) || (b.totalVictories - a.totalVictories)
    || (b.goalsBalance - a.goalsBalance) || (b.goalsFavor - a.goalsFavor));
  }

  static createLeaderboard(teamsHome: ILeaderboard[], teamsAway: ILeaderboard[]) {
    const allTeamsUpdated: ILeaderboard[] = [];
    teamsHome.map((teamHome) => teamsAway.forEach((teamAway) => {
      if (teamHome.name === teamAway.name) {
        const teamUpdated = LeaderboardService.updateTeams(teamHome, teamAway);
        allTeamsUpdated.push(teamUpdated);
      }
    }));
    LeaderboardService.orderLeaderboard(allTeamsUpdated);
    return allTeamsUpdated;
  }

  async getAllInfo(): Promise<ILeaderboard[]> {
    const teamsHome = await this._model.query(queryHome, { type: QueryTypes.SELECT });
    const teamsAway = await this._model.query(queryAway, { type: QueryTypes.SELECT });
    const allTeams = LeaderboardService
      .createLeaderboard(teamsHome as ILeaderboard[], teamsAway as ILeaderboard[]);
    return allTeams as ILeaderboard[];
  }
}
