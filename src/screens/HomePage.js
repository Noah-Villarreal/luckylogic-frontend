import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.svg';

export default function HomePage() {
  const location = useLocation();
  const [picks, setPicks] = useState([]);
  const [history, setHistory] = useState([]);

  const generateRandomPicks = () => {
    const numbers = new Set();
    while (numbers.size < 5) {
      numbers.add(Math.floor(Math.random() * 69) + 1);
    }
    const powerball = Math.floor(Math.random() * 26) + 1;
    const newPick = [...numbers, powerball];
    setPicks(newPick);
    savePickToHistory(newPick);
  };

  const savePickToHistory = (newPick) => {
    try {
      const historyJson = localStorage.getItem('pickHistory');
      const currentHistory = historyJson ? JSON.parse(historyJson) : [];
      const updatedHistory = [newPick, ...currentHistory].slice(0, 100);
      localStorage.setItem('pickHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (e) {
      console.error('❌ Error saving pick:', e);
    }
  };

  const loadPickHistory = () => {
    try {
      const historyJson = localStorage.getItem('pickHistory');
      const storedHistory = historyJson ? JSON.parse(historyJson) : [];
      setHistory(storedHistory);
    } catch (e) {
      console.error('❌ Error loading history:', e);
    }
  };

  useEffect(() => {
    loadPickHistory();
  }, []);

  return (
    <div className="container-with-nav">
      <div className="container">
        <img src={logo} alt="LuckyLogic Logo" className="app-logo" />
        <h1 className="home-title">LuckyLogic</h1>

        <div className="picker-section">
          <button onClick={generateRandomPicks} className="generate-button">
            Generate Pick
          </button>
          {picks.length > 0 && (
            <p className="picks">Current: {picks.join(', ')}</p>
          )}
        </div>

        <div className="historyBox">
          <h3>History</h3>
          {history.slice(0, 5).map((pick, index) => (
            <p key={index}>{pick.join(', ')}</p>
          ))}
        </div>
      </div>

      <nav className="bottom-nav">
        <Link
          to="/powerball"
          className={`tab ${location.pathname === '/powerball' ? 'active' : ''}`}
        >
          🎯<span>Powerball</span>
        </Link>
        <Link
          to="/leaderboard"
          className={`tab ${location.pathname === '/leaderboard' ? 'active' : ''}`}
        >
          🏆<span>Leaderboard</span>
        </Link>
      </nav>
    </div>
  );
}