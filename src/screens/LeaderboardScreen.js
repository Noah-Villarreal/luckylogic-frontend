// src/screens/LeaderboardScreen.js
import React from 'react';
import '../styles/Leaderboard.css';

const leaderboardData = [
  { rank: 1, username: 'LuckyChamp', wins: 12, favorites: 30, streak: 5, score: 118, winRate: 86 },
  { rank: 2, username: 'BallSniper', wins: 10, favorites: 28, streak: 4, score: 103, winRate: 80 },
  { rank: 3, username: 'StreakKing', wins: 9, favorites: 25, streak: 3, score: 97, winRate: 75 },
  { rank: 4, username: 'FavMaster', wins: 7, favorites: 24, streak: 2, score: 89, winRate: 72 },
  { rank: 5, username: 'NumberWizard', wins: 6, favorites: 22, streak: 2, score: 85, winRate: 68 },
];

export default function LeaderboardScreen() {
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">LuckyLogic Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Wins</th>
            <th>Favorites</th>
            <th>Streak</th>
            <th>Win %</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr
              key={user.rank}
              className={
                user.rank === 1 ? 'gold-row'
                : user.rank === 2 ? 'silver-row'
                : user.rank === 3 ? 'bronze-row'
                : ''
              }
            >
              <td>{user.rank}</td>
              <td>
                <span className="username-badge">{user.username}</span>
              </td>
              <td>{user.score}</td>
              <td>{user.wins}</td>
              <td>{user.favorites}</td>
              <td>{user.streak}</td>
              <td>{user.winRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}