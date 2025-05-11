import React, { useState } from 'react';
import '../styles/FantasyLobby.css';

export default function FantasyLobby() {
  const [gameMode, setGameMode] = useState('daily');
  const [gameType, setGameType] = useState('powerball');
  const [draftType, setDraftType] = useState('manual');

  return (
    <div className="fantasy-lobby">
      <h2>LuckyLogic Fantasy Lobby</h2>

      <div className="fantasy-section">
        <label>Game Mode:</label>
        <select value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
          <option value="daily">Daily Matchup (NBA Style)</option>
          <option value="weekly">Weekly Matchup (Fantasy Football Style)</option>
        </select>
      </div>

      <div className="fantasy-section">
        <label>Lottery Game:</label>
        <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
          <option value="powerball">Powerball Only</option>
          <option value="megamillions">Mega Millions Only</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="fantasy-section">
        <label>Draft Type:</label>
        <select value={draftType} onChange={(e) => setDraftType(e.target.value)}>
          <option value="manual">Manual Pick (Live Draft)</option>
          <option value="autopick">AutoPick (SmartLogic)</option>
          <option value="prerank">Pre-Ranked Picks (if you can’t attend)</option>
        </select>
      </div>

      <button className="fantasy-start">Start Draft</button>
    </div>
  );
}