// src/screens/DraftRoom.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/DraftRoom.css';

export default function DraftRoom() {
  const location = useLocation();
  const gameType = location.state?.gameType || 'powerball';

  const [timer, setTimer] = useState(30);
  const [stage, setStage] = useState('white');
  const [drafted, setDrafted] = useState([]);
  const [powerBall, setPowerBall] = useState(null);
  const [draftGrid, setDraftGrid] = useState([]);
  const [mockMode, setMockMode] = useState(false);
  const [scorePreview, setScorePreview] = useState(0);
  const [grade, setGrade] = useState(null);

  const whiteBallMax = gameType === 'megamillions' ? 70 : 69;
  const powerBallMax = gameType === 'megamillions' ? 25 : 26;

  const [availableWhiteBalls, setAvailableWhiteBalls] = useState(
    Array.from({ length: whiteBallMax }, (_, i) => i + 1)
  );
  const [availablePowerBalls, setAvailablePowerBalls] = useState(
    Array.from({ length: powerBallMax }, (_, i) => i + 1)
  );

  useEffect(() => {
    if (timer > 0 && !powerBall) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (!powerBall) {
      if (stage === 'white') autoPickWhite();
      else autoPickPower();
    }
  }, [timer]);

  useEffect(() => {
    if (drafted.length === 5 && powerBall) {
      const score = calculateFantasyScore(drafted, powerBall);
      setScorePreview(score);
      assignDraftGrade(score);
    }
  }, [drafted, powerBall]);

  const calculateFantasyScore = (whites, bonus) => {
    let score = whites.length * 10;
    if (bonus) score += 20;
    if (whites.length === 5) score += 50;
    return score;
  };

  const assignDraftGrade = (score) => {
    if (score >= 100) setGrade('A+');
    else if (score >= 80) setGrade('A');
    else if (score >= 60) setGrade('B');
    else if (score >= 40) setGrade('C');
    else setGrade('D');
  };

  const handlePickWhite = (num) => {
    if (drafted.includes(num) || drafted.length >= 5) return;
    const updated = [...drafted, num].sort((a, b) => a - b);
    setDrafted(updated);
    setAvailableWhiteBalls(availableWhiteBalls.filter(n => n !== num));
    if (updated.length === 5) {
      setStage('power');
      setTimer(30);
    }
  };

  const handlePickPower = (num) => {
    if (powerBall) return;
    setPowerBall(num);
    setAvailablePowerBalls([]);
  };

  const autoPickWhite = () => {
    const rand = availableWhiteBalls[Math.floor(Math.random() * availableWhiteBalls.length)];
    handlePickWhite(rand);
  };

  const autoPickPower = () => {
    const rand = availablePowerBalls[Math.floor(Math.random() * availablePowerBalls.length)];
    handlePickPower(rand);
  };

  const saveDraftToHistory = () => {
    const timestamp = new Date().toISOString();
    const newEntry = {
      id: timestamp,
      gameType,
      picks: drafted,
      bonus: powerBall,
      savedAt: timestamp,
      score: scorePreview,
      grade,
      mock: mockMode,
    };

    const stored = localStorage.getItem('fantasyHistory');
    const history = stored ? JSON.parse(stored) : [];
    const updatedHistory = [newEntry, ...history].slice(0, 50);
    localStorage.setItem('fantasyHistory', JSON.stringify(updatedHistory));
    alert('Draft saved!');
  };

  const handleMockDraft = () => {
    setMockMode(true);
    setDrafted([]);
    setPowerBall(null);
    setTimer(30);
    setStage('white');
    setAvailableWhiteBalls(Array.from({ length: whiteBallMax }, (_, i) => i + 1));
    setAvailablePowerBalls(Array.from({ length: powerBallMax }, (_, i) => i + 1));
    setDraftGrid([]);
    setScorePreview(0);
    setGrade(null);
  };

  return (
    <div className="draft-room">
      <h2>{mockMode ? 'Mock Draft Room' : 'Draft Room'} – {gameType === 'megamillions' ? 'Mega Millions' : 'Powerball'}</h2>
      <p>Time left: <strong>{timer}s</strong></p>

      <button className="fantasy-start" onClick={handleMockDraft}>Start Mock Draft</button>

      {stage === 'white' && (
        <>
          <p>Pick {5 - drafted.length} white ball(s)</p>
          <div className="number-pool">
            {availableWhiteBalls.map((num) => (
              <button key={num} onClick={() => handlePickWhite(num)} className="number-btn">
                {num}
              </button>
            ))}
          </div>
        </>
      )}

      {stage === 'power' && powerBall === null && (
        <>
          <p>Pick your {gameType === 'megamillions' ? 'Mega Ball' : 'Powerball'}</p>
          <div className="number-pool">
            {availablePowerBalls.map((num) => (
              <button key={num} onClick={() => handlePickPower(num)} className="number-btn red">
                {num}
              </button>
            ))}
          </div>
        </>
      )}

      {powerBall && (
        <div className="drafted-numbers">
          <h3>Your Final Picks</h3>
          <div className="picked-list">
            {drafted.map((n, i) => (
              <span key={i} className="picked">{n}</span>
            ))}
            <span className="picked red">{gameType === 'megamillions' ? 'Mega Ball' : 'Powerball'}: {powerBall}</span>
          </div>

          <div className="draft-results">
            <p><strong>Projected Score:</strong> {scorePreview} pts</p>
            <p><strong>Draft Grade:</strong> {grade}</p>
          </div>

          <button className="fantasy-save" onClick={saveDraftToHistory}>Save Draft to History</button>
        </div>
      )}
    </div>
  );
}