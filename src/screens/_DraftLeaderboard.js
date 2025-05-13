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
        if (whiteMatch === 2) score += 5;
        if (whiteMatch === 3) score += 10;
        if (whiteMatch === 4) score += 25;
        if (whiteMatch === 5) score += 50;
        if (bonusMatch) score += 5;

        return {
          id: entry.id,
          name: entry.name || 'Player',
          score
        };
      });

      const sorted = formatted.sort((a, b) => b.score - a.score);
      setPlayers(sorted.slice(0, 10)); // top 10 players
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Draft Leaderboard</h2>
      <ul className="leaderboard-list">
        {players.map((player, index) => (
          <li key={player.id} className="leaderboard-item">
            <span className="rank">#{index + 1}</span>
            <span className="name">{player.name}</span>
            <span className="score">{player.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

