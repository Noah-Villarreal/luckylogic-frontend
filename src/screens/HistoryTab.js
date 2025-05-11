// src/screens/HistoryTab.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Powerball.css'; // reuse ball styles

export default function HistoryTab() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('pickHistory');
    const parsed = raw ? JSON.parse(raw) : [];
    setHistory(parsed);
  }, []);

  return (
    <div className="container-with-nav">
      <div className="container">
        <h2 style={{ marginBottom: '1rem' }}>Pick History</h2>

        {history.length === 0 ? (
          <p>No picks yet. Start generating!</p>
        ) : (
          history.map((pick, index) => (
            <div key={index} className="pick-numbers">
              {pick.slice(0, 5).map((num, i) => (
                <div key={i} className="ball white-ball">{num}</div>
              ))}
              <div className="ball red-ball">{pick[5]}</div>
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