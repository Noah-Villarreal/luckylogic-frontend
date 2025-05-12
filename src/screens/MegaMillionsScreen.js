// src/screens/MegaMillionsScreen.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MegaMillions.css';
import {
  MAX_HISTORY,
  HISTORY_RETENTION_DAYS
} from '../utils/config';
import smartLogic from '../utils/smartLogic';
import PickRow from '../components/PickRow';
import BouncingBalls from '../components/BouncingBalls';
import ControlsBar from '../components/ControlsBar';
import PersonalInput from '../components/PersonalInput';
import HistoryList from '../components/HistoryList';
import TagInfoPanel from '../components/TagInfoPanel';
import { generateUniqueNumbers, formatDate } from '../utils/helpers';
import logo from '../assets/logo.svg';

// Mega-specific storage keys
const MEGA_HISTORY_KEY = 'megamillionsHistory';
const MEGA_FAVORITES_KEY = 'megamillionsFavorites';
const MEGA_PERSONAL_KEY = 'megamillionsPersonalPicks';
const MEGA_DAILY_PICK_KEY = 'megamillionsDailyPick';

export default function MegaMillionsScreen() {
  const [latestPick, setLatestPick] = useState(null);
  const [picks, setPicks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [personalPicks, setPersonalPicks] = useState(() => {
    const stored = localStorage.getItem(MEGA_PERSONAL_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [tab, setTab] = useState('main');
  const [dailyPickAvailable, setDailyPickAvailable] = useState(false);
  const [animationId, setAnimationId] = useState(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [manualNumbers, setManualNumbers] = useState({
    numbers: ['', '', '', '', ''],
    powerball: ''
  });

  useEffect(() => {
    loadFavorites();
    checkDailyPick();
  }, []);

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem(MEGA_FAVORITES_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch (e) {
      console.error('❌ Error loading favorites:', e);
    }
  };

  const checkDailyPick = () => {
    const lastPick = localStorage.getItem(MEGA_DAILY_PICK_KEY);
    const today = new Date().toDateString();
    setDailyPickAvailable(!lastPick || lastPick !== today);
  };

  const generatePick = (isDaily = false) => {
    if (hasGeneratedOnce && latestPick) {
      const updatedPicks = [latestPick, ...picks].slice(0, MAX_HISTORY);
      setPicks(updatedPicks);
    }

    const mainNumbers = generateUniqueNumbers(70, 5);
    const megaBall = Math.floor(Math.random() * 25) + 1;
    const tags = smartLogic(mainNumbers, megaBall);
    if (tags.length === 0) tags.push('🔎 Mystery Pattern');

    const fullPick = {
      id: `${mainNumbers.join('-')}-${megaBall}-${Date.now()}`,
      numbers: mainNumbers,
      powerball: megaBall,
      timestamp: new Date().toISOString(),
      type: isDaily ? 'daily' : 'regular',
      tags
    };

    setLatestPick(fullPick);
    setAnimationId(fullPick.id);
    setHasGenerated(true);
    setHasGeneratedOnce(true);

    if (isDaily) {
      localStorage.setItem(MEGA_DAILY_PICK_KEY, new Date().toDateString());
      setDailyPickAvailable(false);
    }

    try {
      const stored = localStorage.getItem(MEGA_HISTORY_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      const updated = [fullPick, ...parsed].slice(0, 100);
      localStorage.setItem(MEGA_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('❌ Error saving MegaMillions history:', e);
    }
  };

  const toggleFavorite = (pick) => {
    const exists = favorites.some(fav => fav.id === pick.id);
    const updatedFavorites = exists
      ? favorites.filter(fav => fav.id !== pick.id)
      : [pick, ...favorites];
    localStorage.setItem(MEGA_FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const isFavorite = (pick) => favorites.some(fav => fav.id === pick.id);

  const savePersonalPick = () => {
    const numbers = manualNumbers.numbers.map(n => parseInt(n)).filter(n => !isNaN(n));
    const megaBall = parseInt(manualNumbers.powerball);
    if (numbers.length !== 5 || isNaN(megaBall)) {
      alert("Enter 5 white balls (1–70) and 1 Mega Ball (1–25)");
      return;
    }
    const pick = {
      id: `personal-${Date.now()}`,
      numbers: numbers.sort((a, b) => a - b),
      powerball: megaBall,
      timestamp: new Date().toISOString(),
      type: 'personal',
      tags: ['🌟 Personal Pick – Straight from the Heart'],
    };
    const updated = [pick, ...personalPicks];
    setPersonalPicks(updated);
    localStorage.setItem(MEGA_PERSONAL_KEY, JSON.stringify(updated));
    setManualNumbers({ numbers: ['', '', '', '', ''], powerball: '' });
    setShowInput(false);
  };

  const renderPickRow = (pick) => {
    const safeTags = Array.isArray(pick.tags)
      ? pick.tags
      : typeof pick.tags === 'string'
        ? [pick.tags]
        : smartLogic(pick.numbers || [], pick.powerball || 0);

    const highlightClass = pick.type === 'daily' ? 'daily-highlight' : '';

    return (
      <div className={highlightClass}>
        <PickRow
          key={pick.id}
          numbers={pick.numbers || []}
          powerball={pick.powerball}
          tags={safeTags}
          date={pick.timestamp}
          isFavorite={isFavorite(pick)}
          onToggleFavorite={() => toggleFavorite(pick)}
          formatDate={formatDate}
          type={pick.type}
        />
      </div>
    );
  };

  const getFilteredHistory = () => {
    try {
      const stored = localStorage.getItem(MEGA_HISTORY_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      const now = new Date();
      return parsed.filter(pick => {
        const pickDate = new Date(pick.timestamp);
        const diffDays = (now - pickDate) / (1000 * 60 * 60 * 24);
        return diffDays <= HISTORY_RETENTION_DAYS;
      });
    } catch (e) {
      return [];
    }
  };

  return (
    <>
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
          <Link to="/">
            <button style={{
              padding: '6px 12px',
              fontSize: '0.9rem',
              borderRadius: '6px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}>
              ← Home
            </button>
          </Link>
        </div>

        <img src={logo} alt="Mega Millions Logo" className="app-logo" />
        <h1 className="powerball-title">Mega Millions</h1>

        <ControlsBar
          onGenerate={() => generatePick(false)}
          onDailyPick={() => generatePick(true)}
          dailyPickAvailable={dailyPickAvailable}
          tab={tab}
          setTab={setTab}
        />

        {hasGenerated && latestPick && (
          <BouncingBalls latestPick={latestPick} animationId={animationId} />
        )}

        {tab === 'main' && <HistoryList title="Last Picks" picks={picks.slice(0, 5)} renderPickRow={renderPickRow} />}
        {tab === 'favorites' && <HistoryList title="Favorites" picks={favorites} renderPickRow={renderPickRow} />}
        {tab === 'history' && <HistoryList title="MegaMillions History" picks={getFilteredHistory()} renderPickRow={renderPickRow} />}
        {tab === 'personal' && (
          <PersonalInput
            showInput={showInput}
            setShowInput={setShowInput}
            manualNumbers={manualNumbers}
            setManualNumbers={setManualNumbers}
            savePersonalPick={savePersonalPick}
            personalPicks={personalPicks}
            renderPickRow={renderPickRow}
          />
        )}
      </div>
      <TagInfoPanel />
    </>
  );
}