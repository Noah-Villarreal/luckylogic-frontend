<<<<<<< HEAD
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
=======
// app.js
import React, { useState, useEffect } from 'react';
>>>>>>> 1510984 (Deploy: latest frontend updates)
import './App.css';

const DAILY_PICK_KEY = 'lastDailyPickDate';
const FAVORITES_KEY = 'powerballFavorites';
const HISTORY_KEY = 'powerballHistory';
const FULL_HISTORY_KEY = 'powerballFullHistory';
const MAX_HISTORY = 50;
const HISTORY_RETENTION_DAYS = 30;

export default function App() {
  const [latestPick, setLatestPick] = useState(null);
  const [picks, setPicks] = useState([]); // session only
  const [favorites, setFavorites] = useState([]);
  const [tab, setTab] = useState('main');
  const [dailyPickAvailable, setDailyPickAvailable] = useState(false);
  const [animationId, setAnimationId] = useState(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);

  useEffect(() => {
    loadFavorites();
    migrateHistoryToFull();
    checkDailyPick();
  }, []);

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch (e) {
      console.error('❌ Error loading favorites:', e);
    }
  };

  const migrateHistoryToFull = () => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      const now = new Date();

      const filtered = parsed.filter(pick => {
        const pickDate = new Date(pick.timestamp);
        const diffDays = (now - pickDate) / (1000 * 60 * 60 * 24);
        return diffDays <= HISTORY_RETENTION_DAYS;
      });

      const fullStored = localStorage.getItem(FULL_HISTORY_KEY);
      const fullParsed = fullStored ? JSON.parse(fullStored) : [];
      const merged = [...filtered, ...fullParsed].slice(0, 200); // cap

      localStorage.setItem(FULL_HISTORY_KEY, JSON.stringify(merged));
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error('❌ Error migrating history:', e);
    }
  };

  const checkDailyPick = () => {
    const lastPick = localStorage.getItem(DAILY_PICK_KEY);
    const today = new Date().toDateString();
    setDailyPickAvailable(!lastPick || lastPick !== today);
  };

  const generateUniqueNumbers = (max, count) => {
    const numbers = new Set();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  };

  const generatePick = (isDaily = false) => {
    if (hasGeneratedOnce && latestPick) {
      const updatedPicks = [latestPick, ...picks].slice(0, MAX_HISTORY);
      setPicks(updatedPicks);
    }

    const mainNumbers = generateUniqueNumbers(69, 5);
    const powerball = Math.floor(Math.random() * 26) + 1;

    const fullPick = {
      id: `${mainNumbers.join('-')}-${powerball}-${Date.now()}`,
      numbers: mainNumbers,
      powerball,
      timestamp: new Date().toISOString(),
      type: isDaily ? 'daily' : 'regular',
    };

    setLatestPick(fullPick);
    setAnimationId(fullPick.id);
    setHasGenerated(true);
    setHasGeneratedOnce(true);

    if (isDaily) {
      localStorage.setItem(DAILY_PICK_KEY, new Date().toDateString());
      setDailyPickAvailable(false);
    }

    // Append to FULL_HISTORY_KEY
    try {
      const fullStored = localStorage.getItem(FULL_HISTORY_KEY);
      const fullParsed = fullStored ? JSON.parse(fullStored) : [];
      const updated = [fullPick, ...fullParsed].slice(0, 200);
      localStorage.setItem(FULL_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('❌ Error saving to full history:', e);
    }
  };

  const generateDailyPick = () => {
    if (dailyPickAvailable) {
      generatePick(true);
    }
  };

  const toggleFavorite = (pick) => {
    const exists = favorites.some((fav) => fav.id === pick.id);
    const updatedFavorites = exists
      ? favorites.filter((fav) => fav.id !== pick.id)
      : [pick, ...favorites];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const isFavorite = (pick) => favorites.some((fav) => fav.id === pick.id);

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US');

  const renderBouncingBalls = () => {
    if (!hasGenerated || !latestPick) return null;
    const displayTime = 300;
    const totalBalls = [...latestPick.numbers, latestPick.powerball];

    return (
      <div key={animationId} className="bouncy-castle-row">
        {totalBalls.map((num, index) => (
          <div key={index} className="bouncy-castle">
            <div
              className={`ball ${index < 5 ? 'white-ball' : 'red-ball'} bounce bounce-delay-${index}`}
            >
              <span
                style={{
                  visibility: 'hidden',
                  animation: `fadeIn 0.3s ease-in-out forwards`,
                  animationDelay: `${index * displayTime}ms`,
                  display: 'inline-block'
                }}
              >
                {num}
              </span>
            </div>
            <div className={`ball-shadow bounce-shadow bounce-delay-${index}`}></div>
          </div>
        ))}
      </div>
    );
  };

  const renderMainHistory = () => {
    if (!hasGeneratedOnce || picks.length < 1) return null;
    return (
      <div className="history-list">
        {picks.slice(0, 5).map((pick) => (
          <div key={pick.id} className={`pick-row ${pick.type === 'daily' ? 'daily-pick' : ''}`}>
            <div className="pick-numbers">
              {pick.numbers.map((num, index) => (
                <div key={index} className="ball white-ball history-ball">{num}</div>
              ))}
              <div className="ball red-ball history-ball">{pick.powerball}</div>
            </div>
            <button className="heart-button" onClick={() => toggleFavorite(pick)}>
              {isFavorite(pick) ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderFavorites = () => (
    <div className="history-list">
      {favorites.map((pick) => (
        <div key={pick.id} className={`pick-row ${pick.type === 'daily' ? 'daily-pick' : ''}`}>
          <div className="pick-numbers">
            {pick.numbers.map((num, index) => (
              <div key={index} className="ball white-ball history-ball">{num}</div>
            ))}
            <div className="ball red-ball history-ball">{pick.powerball}</div>
          </div>
          <button className="heart-button" onClick={() => toggleFavorite(pick)}>
            {isFavorite(pick) ? '❤️' : '🤍'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderFullHistory = () => {
    const now = new Date();
    try {
      const stored = localStorage.getItem(FULL_HISTORY_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      const filtered = parsed.filter((pick) => {
        const pickDate = new Date(pick.timestamp);
        const diffDays = (now - pickDate) / (1000 * 60 * 60 * 24);
        return diffDays <= HISTORY_RETENTION_DAYS;
      });

      return (
        <div className="history-list">
          {filtered.map((pick) => (
            <div key={pick.id} className="pick-row">
              <span className="pick-date">{formatDate(pick.timestamp)}</span>
              <div className="history-balls">
                {pick.numbers.map((num, index) => (
                  <div key={index} className="ball white-ball history-ball">{num}</div>
                ))}
                <div className="ball red-ball history-ball">{pick.powerball}</div>
              </div>
              <button className="heart-button" onClick={() => toggleFavorite(pick)}>
                {isFavorite(pick) ? '❤️' : '🤍'}
              </button>
            </div>
          ))}
        </div>
      );
    } catch (e) {
      return <div>Error loading full history</div>;
    }
  };

  return (
    <div className="App">
      <h1>LuckyLogic Powerball 🎯</h1>

      <div className="controls">
        <button className="generate-button" onClick={() => generatePick(false)}>
          Generate Powerball Numbers
        </button>
        {dailyPickAvailable && (
          <button className="daily-button" onClick={generateDailyPick}>
            Get Daily Lucky Pick ✨
          </button>
        )}
        <button className="toggle-button" onClick={() => setTab(tab === 'favorites' ? 'main' : 'favorites')}>
          {tab === 'favorites' ? 'Show Main' : 'Show Favorites'}
        </button>
        <button className="toggle-button" onClick={() => setTab(tab === 'history' ? 'main' : 'history')}>
          {tab === 'history' ? 'Show Main' : 'Show History'}
        </button>
      </div>

      {renderBouncingBalls()}

      {tab === 'main' && renderMainHistory()}
      {tab === 'favorites' && renderFavorites()}
      {tab === 'history' && renderFullHistory()}
    </div>
  );
}
<<<<<<< HEAD

<<<<<<< HEAD
export default App;
>>>>>>> 9f40d55 (Initialize project using Create React App)
=======
>>>>>>> b966f9e (Added pick animation and updated styling)
=======
>>>>>>> 1510984 (Deploy: latest frontend updates)
