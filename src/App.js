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
import './App.css';

function App() {
  const [picks, setPicks] = useState([]);

  const generatePicks = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/pick");
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data = await response.json();

      const formatted = data.picks.map(
        ([nums, power]) => `${nums.join(', ')} + PB: ${power}`
      );
      setPicks(formatted);
    } catch (error) {
      console.error("Error fetching picks:", error);
      setPicks(["Failed to fetch picks"]);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎰 LuckyLogic Powerball Picks</h1>
      <button
        onClick={generatePicks}
        style={{ fontSize: "1.2rem", padding: "0.5rem 1rem" }}
      >
        Generate Picks
      </button>
      <div style={{ marginTop: "2rem" }}>
        {picks.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
>>>>>>> 9f40d55 (Initialize project using Create React App)
