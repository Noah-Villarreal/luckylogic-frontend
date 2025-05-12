// src/screens/HistoryTab.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Powerball.css';

export default function HistoryTab() {
  const [combinedHistory, setCombinedHistory] = useState([]);

  useEffect(() => {
    const fetchCombinedHistory = () => {
      try {
        const powerballJson = localStorage.getItem('powerballHistory');
        const megaJson = localStorage.getItem('megamillionsHistory');

        const powerball = powerballJson ? JSON.parse(powerballJson) : [];
        const mega = megaJson ? JSON.parse(megaJson) : [];

        const combined = [
          ...powerball.map(p => ({ ...p, game: 'Powerball' })),
          ...mega.map(p => ({ ...p, game: 'Mega Millions' }))
        ];

        const sorted = combined
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 100);

        setCombinedHistory(sorted);
      } catch (e) {
        console.error('❌ Error loading combined history:', e);
      }
    };

    fetchCombinedHistory();
  }, []);

  return (
    <div className="container-with-nav">
      <div className="container">
        <h2 style={{ marginBottom: '1rem' }}>Pick History</h2>

        {combinedHistory.length === 0 ? (
          <p>No picks yet. Start generating!</p>
        ) : (
          combinedHistory.map((pick, index) => {
            const isDaily = pick.type === 'daily';
            const highlightClass = isDaily ? 'daily-highlight' : '';

            return (
              <div key={index} className={`history-row ${highlightClass}`}>
                <div className="history-meta">
                  <span className="history-date">
                    {new Date(pick.timestamp).toLocaleDateString()}
                  </span>
                  <span className="history-game">{pick.game}</span>
                </div>
                <div className="history-balls">
                  {pick.numbers?.map((num, i) => (
                    <span key={i} className="ball white-ball">{num}</span>
                  ))}
                  <span className="ball red-ball">{pick.powerball}</span>
                </div>
              </div>
            );
          })
        )}

        <Link to="/" style={{ marginTop: '2rem', display: 'inline-block' }}>
          <button className="generate-button">← Back to Home</button>
        </Link>
      </div>
    </div>
  );
}