import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './screens/HomePage';
import PowerballScreen from './screens/PowerballScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import HistoryTab from './screens/HistoryTab'; 
import FantasyLobby from './screens/FantasyLobby';

...

<Route path="/fantasy" element={<FantasyLobby />} />// <-- ADD THIS

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/powerball" element={<PowerballScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/history" element={<HistoryTab />} /> {/* <-- ADD THIS */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}