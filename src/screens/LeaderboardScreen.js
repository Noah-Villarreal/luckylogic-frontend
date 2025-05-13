import React from 'react';
import '../styles/Leaderboard.css';

const leaderboardData = [
  { rank: 1, username: 'LuckyChamp', wins: 12, losses: 3, favorites: 30, streak: 5, score: 118, winRate: 86, badge: '🏆' },
  { rank: 2, username: 'BallSniper', wins: 10, losses: 4, favorites: 28, streak: 4, score: 103, winRate: 80, badge: '🔥' },
  { rank: 3, username: 'StreakKing', wins: 9, losses: 5, favorites: 25, streak: 3, score: 97, winRate: 75, badge: '⭐' },
  { rank: 4, username: 'FavMaster', wins: 7, losses: 6, favorites: 24, streak: 2, score: 89, winRate: 72, badge: '' },
  { rank: 5, username: 'NumberWizard', wins: 6, losses: 7, favorites: 22, streak: 2, score: 85, winRate: 68, badge: '' },
];

const currentUser = localStorage.getItem('username') || 'LuckyChamp';

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
            <th>Record</th>
            <th>Favorites</th>
            <th>Streak</th>
            <th>Win %</th>
            <th>Badge</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => {
            const rowClass =
              user.username === currentUser ? 'current-user' :
              user.rank === 1 ? 'gold-row' :
              user.rank === 2 ? 'silver-row' :
              user.rank === 3 ? 'bronze-row' : '';

            const tooltip = `Longest Streak: ${user.streak}\nTotal Games: ${user.wins + user.losses}`;

            return (
              <tr key={user.rank} className={rowClass}>
                <td>{user.rank}</td>
                <td title={tooltip}>
                  <span className="username-badge">{user.username}</span>
                </td>
                <td>{user.score}</td>
                <td>{user.wins}–{user.losses}</td>
                <td>{user.favorites}</td>
                <td>{user.streak}</td>
                <td>{user.winRate}%</td>
                <td className="badge-icon">{user.badge}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}