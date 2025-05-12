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
        <img src={logo} alt="LuckyLogic Logo" className="app-logo logo-pulse" />
      </div>

      <nav className="bottom-nav">
        <Link
          to="/powerball"
          className={`tab powerball-tab ${location.pathname === '/powerball' ? 'active' : ''}`}
        >
          Powerball
        </Link>

        <Link
          to="/megamillions"
          className={`tab megamillions-tab ${location.pathname === '/megamillions' ? 'active' : ''}`}
        >
          Mega Millions
        </Link>

        <Link
          to="/history"
          className={`tab ${location.pathname === '/history' ? 'active' : ''}`}
        >
          History
        </Link>

        <Link
          to="/leaderboard"
          className={`tab ${location.pathname === '/leaderboard' ? 'active' : ''}`}
        >
          Leaderboard
        </Link>
      </nav>
    </div>
  );
}