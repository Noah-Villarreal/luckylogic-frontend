import React, { useEffect, useState } from 'react';
import '../styles/FantasyHistory.css';

export default function FantasyHistory() {
  const [history, setHistory] = useState([]);
  const [winningDraw, setWinningDraw] = useState({
    gameType: 'powerball',
    picks: [1, 2, 3, 4, 5],
    bonus: 6,
  });

  useEffect(() => {
    loadHistory();
  }, [winningDraw]);

  const loadHistory = () => {
    const stored = localStorage.getItem('fantasyHistory');
    if (stored) {
      const parsed = JSON.parse(stored);
      const scored = parsed.map(entry => ({
        ...entry,
        score: calculateScore(entry),
      }));
      setHistory(scored);
    }
  };

  const calculateScore = (entry) => {
    if (entry.gameType !== winningDraw.gameType) return 0;

    const whiteMatches = entry.picks.filter(n => winningDraw.picks.includes(n)).length;
    const bonusMatch = entry.bonus === winningDraw.bonus;

    let score = whiteMatches * 5;
    if (bonusMatch) score += 15;
    if (whiteMatches >= 3) score += 10;
    if (whiteMatches === 5) score += 25;
    if (whiteMatches === 5 && bonusMatch) return 'JACKPOT';

    return score;
  };

  const handleChange = (e, index) => {
    const newPicks = [...winningDraw.picks];
    newPicks[index] = parseInt(e.target.value) || 0;
    setWinningDraw({ ...winningDraw, picks: newPicks });
  };

  return (
    <div className="fantasy-history">
      <h2>Fantasy Draft History</h2>

      <div className="winning-draw-input">
        <h4>Set Winning Draw:</h4>
        <div className="draw-form">
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              key={i}
              type="number"
              min="1"
              max={winningDraw.gameType === 'megamillions' ? 70 : 69}
              value={winningDraw.picks[i]}
              onChange={(e) => handleChange(e, i)}
            />
          ))}
          <input
            type="number"
            min="1"
            max={winningDraw.gameType === 'megamillions' ? 25 : 26}
            value={winningDraw.bonus}
            onChange={(e) =>
              setWinningDraw({ ...winningDraw, bonus: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      {history.length === 0 ? (
        <p>No saved drafts yet.</p>
      ) : (
        history.map((entry) => (
          <div key={entry.id} className="history-card">
            <h4>{entry.gameType === 'megamillions' ? 'Mega Millions' : 'Powerball'}</h4>
            <p><strong>Date:</strong> {new Date(entry.savedAt).toLocaleString()}</p>
            <p><strong>Picks:</strong> {entry.picks.join(', ')} |
              <span className="red-ball">
                {entry.gameType === 'megamillions' ? ' Mega Ball' : ' Powerball'}: {entry.bonus}
              </span>
            </p>
            <p><strong>Fantasy Score:</strong> {entry.score}</p>
          </div>
        ))
      )}
    </div>
  );
}