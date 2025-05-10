import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './screens/HomePage';
import PowerballScreen from './screens/PowerballScreen';
import LeaderboardScreen from './screens/LeaderboardScreen'; // Optional: if you're adding this next

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/powerball" element={<PowerballScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        {/* Fallback route in case someone mistypes a path */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
