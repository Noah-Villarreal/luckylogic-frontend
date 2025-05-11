// src/screens/HomePage.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.svg';

export default function HomePage() {
  const location = useLocation();

  return (
    <div className="container-with-nav">
      <div className="container">
        <img src={logo} alt="LuckyLogic Logo" className="app-logo" />
      </div>

      <nav className="bottom-nav">
        <Link
          to="/powerball"
          className={`tab ${location.pathname === '/powerball' ? 'active' : ''}`}
        >
          🎯<span>Powerball</span>
        </Link>
        <Link
          to="/history"
          className={`tab ${location.pathname === '/history' ? 'active' : ''}`}
        >
          📜<span>History</span>
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