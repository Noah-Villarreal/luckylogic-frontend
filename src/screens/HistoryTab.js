// src/screens/HistoryTab.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Powerball.css';

export default function HistoryTab() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const historyJson = localStorage.getItem('pickHistory');
      const storedHistory = historyJson ? JSON.parse(historyJson) : [];
      setHistory(storedHistory.slice(0, 100));
    } catch (e) {
      console.error('❌ Error loading history:', e);
    }
  }, []);

  return (
    <div className="container-with-nav">
      <div className="container">
        <h2 style={{ marginBottom: '1rem' }}>Pick History</h2>
        {history.length === 0 ? (
          <p>No picks yet. Start generating!</p>
        ) : (
          history.map((pick, index) => (
            <div key={index} className="history-row">
              <div className="history-date">
                {new Date().toLocaleDateString()}
              </div>
              <div className="history-balls">
                {pick.slice(0, 5).map((num, i) => (
                  <span key={i} className="ball white-ball">{num}</span>
                ))}
                <span className="ball red-ball">{pick[5]}</span>
              </div>
            </div>
          ))
        )}
        <Link to="/" style={{ marginTop: '2rem', display: 'inline-block' }}>
          <button className="generate-button">← Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
