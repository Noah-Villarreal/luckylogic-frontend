// src/screens/HomePage.js

import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.svg';

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    const fantasyUnlocked = JSON.parse(localStorage.getItem('fantasyUnlocked'));

    // Only trigger fantasy unlock swipe if it's from the bottom, horizontal, and allowed
    if (
      fantasyUnlocked &&
      deltaX > 80 &&                   // Swipe right
      Math.abs(deltaY) < 50 &&        // Not a vertical scroll
      touchStartY.current > window.innerHeight - 100 // Swipe started near bottom
    ) {
      navigate('/fantasy');
    }
  };

  return (
    <div
      className="container-with-nav"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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