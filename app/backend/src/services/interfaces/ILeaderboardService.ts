export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default interface ILeaderboardService {
  getHomeInfo(): Promise<ILeaderboard[] | void>;
  getAwayInfo(): Promise<ILeaderboard[] | void>;
  getAllInfo(): Promise<ILeaderboard[] | void>;
}
