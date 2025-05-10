import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Optional: CSS styles

export default function HomePage() {
  const [picks, setPicks] = useState([]);
  const [history, setHistory] = useState([]);

  const generateRandomPicks = () => {
    let numbers = new Set();
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
    <div className="container">
      <h1>🎰 LuckyLogic</h1>

      <div className="nav-buttons">
        <Link to="/powerball"><button>🎯 Powerball</button></Link>
        <Link to="/leaderboard"><button>🏆 Leaderboard</button></Link>
      </div>

      <div className="picker-section">
        <button onClick={generateRandomPicks}>Generate Pick</button>
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
  );
}
