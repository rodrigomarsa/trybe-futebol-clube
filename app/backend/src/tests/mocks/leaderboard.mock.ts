import { ILeaderboard } from "../../services/interfaces/ILeaderboardService";

export const mockedLeaderboardHome: ILeaderboard[] = [
  {
    name: "Palmeiras",
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 10,
    goalsOwn: 5,
    goalsBalance: 5,
    efficiency: 77.78
  },
  {
    name: "Corinthians",
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 6,
    goalsOwn: 1,
    goalsBalance: 5,
    efficiency: 100.00
  },
]

export const mockedLeaderboardAway: ILeaderboard[] = [
  {
    name: "Palmeiras",
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 7,
    goalsOwn: 0,
    goalsBalance: 7,
    efficiency: 100.00
  },
  {
    name: "Corinthians",
    totalPoints: 6,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 6,
    goalsOwn: 2,
    goalsBalance: 4,
    efficiency: 66.67
  },
]

export const mockedLeaderboard: ILeaderboard[] = [
  {
    name: "Palmeiras",
    totalPoints: 13,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 17,
    goalsOwn: 5,
    goalsBalance: 12,
    efficiency: 86.67
  },
  {
    name: "Corinthians",
    totalPoints: 12,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 12,
    goalsOwn: 3,
    goalsBalance: 9,
    efficiency: 80
  },
]