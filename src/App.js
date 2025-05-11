import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './screens/HomePage';
import PowerballScreen from './screens/PowerballScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import HistoryTab from './screens/HistoryTab';
import FantasyLobby from './screens/FantasyLobby'; // Hidden Fantasy Draft Lobby
import DraftRoom from './screens/DraftRoom'; // Draft Room Screen
import FantasyHistory from './screens/FantasyHistory'; // Fantasy Draft History

export default function App() {
  useEffect(() => {
    const today = new Date().toDateString(); // Ex: "Sun May 12 2025"
    const data = JSON.parse(localStorage.getItem('loyaltyTracker')) || {
      daysOpened: [],
      fantasyUnlocked: false,
      fantasyEntryNumber: null,
      lastOpened: null,
    };

    // Add unique day if not already counted
    if (!data.daysOpened.includes(today)) {
      data.daysOpened.push(today);
    }

    // Update last opened timestamp
    data.lastOpened = new Date().toISOString();

    // Save back to localStorage
    localStorage.setItem('loyaltyTracker', JSON.stringify(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/powerball" element={<PowerballScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/history" element={<HistoryTab />} />
        <Route path="/fantasy" element={<FantasyLobby />} /> {/* Hidden Fantasy Draft Lobby */}
        <Route path="/draft" element={<DraftRoom />} /> {/* Draft Room Screen */}
        <Route path="/fantasy-history" element={<FantasyHistory />} /> {/* Fantasy Draft History */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}