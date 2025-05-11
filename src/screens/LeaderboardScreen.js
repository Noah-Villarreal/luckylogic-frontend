import React from 'react';
import '../styles/Leaderboard.css';

const leaderboardData = [
  { rank: 1, username: 'LuckyChamp', wins: 12, favorites: 30, streak: 5 },
  { rank: 2, username: 'BallSniper', wins: 10, favorites: 28, streak: 4 },
  { rank: 3, username: 'StreakKing', wins: 9, favorites: 25, streak: 3 },
  { rank: 4, username: 'FavMaster', wins: 7, favorites: 24, streak: 2 },
  { rank: 5, username: 'NumberWizard', wins: 6, favorites: 22, streak: 2 },
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
            <th>Wins</th>
            <th>Favorites</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.rank}>
              <td>{user.rank}</td>
              <td>{user.username}</td>
              <td>{user.wins}</td>
              <td>{user.favorites}</td>
              <td>{user.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}