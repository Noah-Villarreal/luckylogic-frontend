import React, { useEffect, useState } from 'react';
import '../styles/MatchupHistory.css';

export default function MatchupHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('fantasyHistory');
    if (stored) {
      const parsed = JSON.parse(stored);
      setHistory(parsed.slice(0, 50)); // limit to 50 records
    }
  }, []);

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="matchup-history">
      <h2>Fantasy Matchup History</h2>
      {history.length === 0 ? (
        <p>No matchups saved yet. Play a draft to generate history.</p>
      ) : (
        <div className="history-list">
          {history.map((match, index) => (
            <div key={index} className="match-entry">
              <div className="match-header">
                <span className="match-date">{formatDate(match.savedAt)}</span>
                <span className="match-type">{match.gameType.toUpperCase()}</span>
              </div>
              <div className="match-picks">
                {match.picks.map((n, i) => (
                  <span key={i} className="ball">{n}</span>
                ))}
                <span className="ball red">
                  {match.gameType === 'megamillions' ? 'MB' : 'PB'}: {match.bonus}
                </span>
              </div>
              <div className="match-result">
                <strong>Saved as:</strong> {match.id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}