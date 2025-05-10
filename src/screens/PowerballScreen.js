// 🧪 Testing test-preview branch
import React, { useState, useEffect } from 'react';
import '../styles/Powerball.css'; // ✅ Corrected path
import {
  DAILY_PICK_KEY,
  FAVORITES_KEY,
  HISTORY_KEY,
  FULL_HISTORY_KEY,
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

export default function PowerballScreen() {
  const [latestPick, setLatestPick] = useState(null);
  const [picks, setPicks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [personalPicks, setPersonalPicks] = useState(() => {
    const stored = localStorage.getItem('personalPicks');
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
    migrateHistoryToFull();
    checkDailyPick();
    repairOldPicks();
  }, []);

  const repairOldPicks = () => {
    try {
      const raw = localStorage.getItem(FULL_HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const repaired = parsed.map((pick) => ({
        ...pick,
        numbers: Array.isArray(pick.numbers) ? pick.numbers : [],
        powerball: typeof pick.powerball === 'number' ? pick.powerball : 0,
        timestamp: pick.timestamp || new Date().toISOString(),
        tags: Array.isArray(pick.tags)
          ? pick.tags
          : typeof pick.tags === 'string'
            ? [pick.tags]
            : smartLogic(pick.numbers || [], pick.powerball || 0)
      }));
      localStorage.setItem(FULL_HISTORY_KEY, JSON.stringify(repaired));
    } catch (err) {
      console.error('❌ Error repairing picks:', err);
    }
  };

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
      const merged = [...filtered, ...fullParsed].slice(0, 200);
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

  const generatePick = (isDaily = false) => {
    if (hasGeneratedOnce && latestPick) {
      const updatedPicks = [latestPick, ...picks].slice(0, MAX_HISTORY);
      setPicks(updatedPicks);
    }
    const mainNumbers = generateUniqueNumbers(69, 5);
    const powerball = Math.floor(Math.random() * 26) + 1;
    const tags = smartLogic(mainNumbers, powerball);
    if (tags.length === 0) tags.push('🔎 Mystery Pattern');

    const fullPick = {
      id: `${mainNumbers.join('-')}-${powerball}-${Date.now()}`,
      numbers: mainNumbers,
      powerball,
      timestamp: new Date().toISOString(),
      type: isDaily ? 'daily' : 'regular',
      tags
    };

    setLatestPick(fullPick);
    setAnimationId(fullPick.id);
    setHasGenerated(true);
    setHasGeneratedOnce(true);

    if (isDaily) {
      localStorage.setItem(DAILY_PICK_KEY, new Date().toDateString());
      setDailyPickAvailable(false);
    }

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
    if (dailyPickAvailable) generatePick(true);
  };

  const toggleFavorite = (pick) => {
    const exists = favorites.some(fav => fav.id === pick.id);
    const updatedFavorites = exists
      ? favorites.filter(fav => fav.id !== pick.id)
      : [pick, ...favorites];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const isFavorite = (pick) => favorites.some(fav => fav.id === pick.id);

  const savePersonalPick = () => {
    const numbers = manualNumbers.numbers.map(n => parseInt(n)).filter(n => !isNaN(n));
    const powerball = parseInt(manualNumbers.powerball);
    if (numbers.length !== 5 || isNaN(powerball)) {
      alert("Enter 5 white balls (1–69) and 1 Powerball (1–26)");
      return;
    }
    const pick = {
      id: `personal-${Date.now()}`,
      numbers: numbers.sort((a, b) => a - b),
      powerball,
      timestamp: new Date().toISOString(),
      type: 'personal',
      tags: ['🌟 Personal Pick – Straight from the Heart'],
    };
    const updated = [pick, ...personalPicks];
    setPersonalPicks(updated);
    localStorage.setItem('personalPicks', JSON.stringify(updated));
    setManualNumbers({ numbers: ['', '', '', '', ''], powerball: '' });
    setShowInput(false);
  };

  const renderPickRow = (pick) => {
    const rawTags = pick.tags;
    const safeTags = Array.isArray(rawTags)
      ? rawTags
      : typeof rawTags === 'string'
        ? [rawTags]
        : smartLogic(pick.numbers || [], pick.powerball || 0);

    return (
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
    );
  };

  const renderBouncingBalls = () => (
    hasGenerated && latestPick ? (
      <BouncingBalls latestPick={latestPick} animationId={animationId} />
    ) : null
  );

  return (
    <>
      <div className="App">
        <img src={logo} alt="Powerball Logo" className="app-logo" />
        <h1 className="powerball-title">Powerball</h1>
        <ControlsBar
          onGenerate={() => generatePick(false)}
          onDailyPick={generateDailyPick}
          dailyPickAvailable={dailyPickAvailable}
          tab={tab}
          setTab={setTab}
        />
        {renderBouncingBalls()}
        {tab === 'main' && <HistoryList title="Last Picks" picks={picks.slice(0, 5)} renderPickRow={renderPickRow} />}
        {tab === 'favorites' && <HistoryList title="Favorites" picks={favorites} renderPickRow={renderPickRow} />}
        {tab === 'history' && (
          <HistoryList
            title="Full History"
            picks={(() => {
              const now = new Date();
              try {
                const stored = localStorage.getItem(FULL_HISTORY_KEY);
                const parsed = stored ? JSON.parse(stored) : [];
                return parsed.filter(pick => {
                  const pickDate = new Date(pick.timestamp);
                  const diffDays = (now - pickDate) / (1000 * 60 * 60 * 24);
                  return diffDays <= HISTORY_RETENTION_DAYS;
                });
              } catch (e) {
                return [];
              }
            })()}
            renderPickRow={renderPickRow}
          />
        )}
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
