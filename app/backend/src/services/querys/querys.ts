export const queryHome = `
SELECT 
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
    railway.teams AS t
INNER JOIN
    railway.matches AS m ON t.id = m.home_team_id
WHERE
    m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

export const queryAway = `
SELECT 
    t.team_name AS name,
    ((SUM(m.away_team_goals > m.home_team_goals) * 3) + 
    SUM(m.away_team_goals = m.home_team_goals) * 1) AS totalPoints,
    COUNT(m.away_team_id) AS totalGames,
    SUM(m.away_team_goals > m.home_team_goals) AS totalVictories,
    SUM(m.away_team_goals = m.home_team_goals) AS totalDraws,
    SUM(m.away_team_goals < m.home_team_goals) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    SUM(m.away_team_goals - m.home_team_goals) AS goalsBalance,
    ROUND(((((SUM(m.away_team_goals > m.home_team_goals) * 3) + 
    SUM(m.away_team_goals = m.home_team_goals) * 1) /
    (COUNT(m.away_team_id) * 3)) * 100), 2) AS efficiency
FROM
    railway.teams AS t
INNER JOIN
    railway.matches AS m ON t.id = m.away_team_id
WHERE
    m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;
