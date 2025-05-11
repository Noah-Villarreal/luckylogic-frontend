import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/DraftRoom.css';

export default function DraftRoom() {
  const location = useLocation();
  const gameType = location.state?.gameType || 'powerball'; // default to powerball

  const [timer, setTimer] = useState(30);
  const [stage, setStage] = useState('white'); // 'white' or 'power'
  const [drafted, setDrafted] = useState([]);
  const [powerBall, setPowerBall] = useState(null);

  const whiteBallMax = gameType === 'megamillions' ? 70 : 69;
  const powerBallMax = gameType === 'megamillions' ? 25 : 26;

  const [availableWhiteBalls, setAvailableWhiteBalls] = useState(
    Array.from({ length: whiteBallMax }, (_, i) => i + 1)
  );
  const [availablePowerBalls, setAvailablePowerBalls] = useState(
    Array.from({ length: powerBallMax }, (_, i) => i + 1)
  );

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      if (stage === 'white') autoPickWhite();
      else autoPickPower();
    }
  }, [timer]);

  const handlePickWhite = (num) => {
    const updated = [...drafted, num].sort((a, b) => a - b);
    setDrafted(updated);
    setAvailableWhiteBalls(availableWhiteBalls.filter(n => n !== num));
    if (updated.length === 5) {
      setStage('power');
      setTimer(30);
    } else {
      setTimer(30);
    }
  };

  const handlePickPower = (num) => {
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
    };

    const stored = localStorage.getItem('fantasyHistory');
    const history = stored ? JSON.parse(stored) : [];
    const updatedHistory = [newEntry, ...history].slice(0, 50); // limit to 50 entries

    localStorage.setItem('fantasyHistory', JSON.stringify(updatedHistory));
    alert('Draft saved!');
  };

  return (
    <div className="draft-room">
      <h2>Draft Room – {gameType === 'megamillions' ? 'Mega Millions' : 'Powerball'}</h2>
      <p>Time left to pick: <strong>{timer}s</strong></p>

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
          <h3>Your Final Picks:</h3>
          <div className="picked-list">
            {drafted.map((n, i) => (
              <span key={i} className="picked">{n}</span>
            ))}
            <span className="picked red">
              {gameType === 'megamillions' ? 'Mega Ball' : 'Powerball'}: {powerBall}
            </span>
          </div>
          <button className="fantasy-save" onClick={saveDraftToHistory}>
            Save Draft to History
          </button>
        </div>
      )}
    </div>
  );
}