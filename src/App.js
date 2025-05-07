<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './screens/HomePage';
import PowerballScreen from './screens/PowerballScreen';
import MegaMillionsScreen from './screens/MegaMillionsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import HistoryTab from './screens/HistoryTab';
import FantasyLobby from './screens/FantasyLobby';
import DraftRoom from './screens/DraftRoom';
import FantasyHistory from './screens/FantasyHistory';
import DraftLeaderboard from './screens/DraftLeaderboard'; // ✅ NEW: Added import

export default function App() {
  useEffect(() => {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem('loyaltyTracker')) || {
      daysOpened: [],
      fantasyUnlocked: false,
      fantasyEntryNumber: null,
      lastOpened: null,
    };

    if (!data.daysOpened.includes(today)) {
      data.daysOpened.push(today);
    }

    data.lastOpened = new Date().toISOString();
    localStorage.setItem('loyaltyTracker', JSON.stringify(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/powerball" element={<PowerballScreen />} />
        <Route path="/megamillions" element={<MegaMillionsScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/history" element={<HistoryTab />} />
        <Route path="/fantasy" element={<FantasyLobby />} />
        <Route path="/draft" element={<DraftRoom />} />
        <Route path="/fantasy-history" element={<FantasyHistory />} />
        <Route path="/draft-leaderboard" element={<DraftLeaderboard />} /> {/* ✅ NEW */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    
  );
}
=======
import logo from './logo.svg';
=======
import React, { useState } from 'react';
>>>>>>> 1244dd7 (Initial commit - React frontend)
=======
import React, { useEffect, useState } from 'react';
>>>>>>> b966f9e (Added pick animation and updated styling)
import './App.css';

export default function App() {
  const [picks, setPicks] = useState([]);
  const [history, setHistory] = useState([]);
  const [, setFavorites] = useState([]); // Don't trigger eslint warning
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animatedBalls, setAnimatedBalls] = useState([]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomPicks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setPicks([]);
      setAnimatedBalls([]);
      const numbers = new Set();

      while (numbers.size < 5) {
        numbers.add(Math.floor(Math.random() * 69) + 1);
        await sleep(200);
      }

      await sleep(300);
      const powerball = Math.floor(Math.random() * 26) + 1;
      numbers.add(powerball);

      const sorted = [...numbers].sort((a, b) => a - b);
      setPicks(sorted);

      // Animate each ball sequentially
      for (let i = 0; i < sorted.length; i++) {
        await sleep(100);
        setAnimatedBalls((prev) => [...prev, i]);
      }

      await savePickToHistory(sorted);
    } catch {
      setError('❌ Failed to generate numbers. Try again.');
    } finally {
      setTimeout(() => setIsLoading(false), 400);
    }
  };

  const savePickToHistory = async (newPick) => {
    try {
      const current = JSON.parse(localStorage.getItem('pickHistory')) || [];
      const updated = [newPick, ...current].slice(0, 20);
      localStorage.setItem('pickHistory', JSON.stringify(updated));
      setHistory(updated);
    } catch (e) {
      console.error('❌ Error saving pick:', e);
    }
  };

  const saveFavorite = async (pick) => {
    try {
      const current = JSON.parse(localStorage.getItem('favorites')) || [];
      const updated = [pick, ...current].slice(0, 20);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setFavorites(updated);
    } catch (e) {
      console.error('❌ Error saving favorite:', e);
    }
  };

  const loadPickHistory = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('pickHistory')) || [];
      setHistory(stored);
    } catch (e) {
      console.error('❌ Error loading history:', e);
    }
  };

  useEffect(() => {
    loadPickHistory();
  }, []);

  return (
    <div className="container">
      <h1 className="title">LuckyLogic</h1>
      <button className="button" onClick={generateRandomPicks} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Pick'}
      </button>

      {error && <div className="errorText">{error}</div>}

      <div className="picksContainer">
        {picks.map((num, i) => (
          <div
            key={i}
            className={`pickBall ${i === picks.length - 1 ? 'powerBall' : ''} ${
              animatedBalls.includes(i) ? 'scale' : ''
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="historyBox">
        {history.map((pick, i) => (
          <div className="historyRow" key={`${pick.join('-')}-${i}`}>
            <span className="historyItem">{pick.join(', ')}</span>
            <button onClick={() => saveFavorite(pick)} className="heart">❤️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default App;
>>>>>>> 9f40d55 (Initialize project using Create React App)
=======
>>>>>>> b966f9e (Added pick animation and updated styling)
