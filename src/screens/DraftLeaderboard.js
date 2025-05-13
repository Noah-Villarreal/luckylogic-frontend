import React, { useEffect, useState } from 'react';
import '../styles/DraftLeaderboard.css';

export default function DraftLeaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('fantasyHistory');
      if (!stored) return;

      const entries = JSON.parse(stored);
      const formatted = entries.map((entry) => {
        const whiteMatch = entry.picks.filter(n =>
          [14, 23, 37, 48, 56].includes(n)).length;
        const bonusMatch = entry.bonus === 11;

        let score = 0;
        if (whiteMatch === 1) score += 1;
        else if (whiteMatch === 2) score += 3;
        else if (whiteMatch === 3) score += 6;
        else if (whiteMatch === 4) score += 10;
        else if (whiteMatch === 5) score += 25;
        if (bonusMatch) score += 10;

        return {
          username: entry.username || 'Player',
          picks: entry.picks,
          bonus: entry.bonus,
          score,
          timestamp: entry.savedAt
        };
      });

      const ranked = formatted.sort((a, b) => b.score - a.score);
      setPlayers(ranked);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="leaderboard-live">
      <h2>Live Draft Leaderboard</h2>
      {players.length === 0 ? (
        <p>No players have drafted yet.</p>
      ) : (
        <table className="live-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Picks</th>
              <th>Bonus</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.username}</td>
                <td>{player.picks.join(', ')}</td>
                <td>{player.bonus}</td>
                <td className="live-score">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
