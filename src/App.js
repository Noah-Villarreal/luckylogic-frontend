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