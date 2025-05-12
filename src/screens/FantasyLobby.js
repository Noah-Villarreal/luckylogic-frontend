// src/screens/FantasyLobby.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { unlockFantasyAccess } from '../utils/unlockFantasy';
import { registerReferralCode, redeemReferralCode } from '../utils/referralService';
import '../styles/FantasyLobby.css';

const generateNumbers = () => {
  const whiteBalls = new Set();
  while (whiteBalls.size < 5) {
    whiteBalls.add(Math.floor(Math.random() * 69) + 1);
  }
  const redBall = Math.floor(Math.random() * 26) + 1;
  return { whiteBalls: Array.from(whiteBalls).sort((a, b) => a - b), redBall };
};

const calculateFantasyScore = (pick, winning) => {
  let score = 0;
  const matchedWhites = pick.whiteBalls.filter(n => winning.whiteBalls.includes(n)).length;
  const matchedRed = pick.redBall === winning.redBall;

  score += matchedWhites * 10;
  if (matchedRed) score += 20;

  // Bonuses
  if (matchedWhites === 3) score += 10;
  if (matchedWhites === 4) score += 25;
  if (matchedWhites === 5) score += 100;
  if (matchedWhites === 5 && matchedRed) score += 500;

  return score;
};

export default function FantasyLobby() {
  const [referralCode, setReferralCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [codeUsed, setCodeUsed] = useState(false);
  const [boostCredits, setBoostCredits] = useState(0);
  const [fantasyBadge, setFantasyBadge] = useState(null);
  const [rankMovedUp, setRankMovedUp] = useState(false);
  const [waitlisted, setWaitlisted] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState(null);

  const [mode, setMode] = useState('solo');
  const [entryCount, setEntryCount] = useState(1);
  const [entries, setEntries] = useState([]);
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const existingCode = localStorage.getItem('fantasyReferralCode');
    const usedCode = localStorage.getItem('usedReferralCode');
    const credits = localStorage.getItem('boostCredits');

    let newCode = existingCode;
    if (!existingCode) {
      newCode = 'LL-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      localStorage.setItem('fantasyReferralCode', newCode);
    }

    setReferralCode(newCode);
    setCodeUsed(!!usedCode);
    setBoostCredits(parseInt(credits) || 0);
    registerReferralCode(newCode);

    const result = unlockFantasyAccess();
    if (result.unlocked) {
      const prev = localStorage.getItem('previousFantasyNumber');
      if (prev && parseInt(prev) > result.number) setRankMovedUp(true);
      setFantasyBadge(result.number);
      localStorage.setItem('previousFantasyNumber', result.number.toString());
    } else if (result.waitlisted) {
      setWaitlisted(true);
      if (result.position) {
        setFantasyBadge(`waitlist-${result.position}`);
        setWaitlistPosition(result.position);
      }
    }
  }, []);

  const handleRedeemCode = async () => {
    if (
      enteredCode &&
      enteredCode !== referralCode &&
      !localStorage.getItem('usedReferralCode')
    ) {
      const success = await redeemReferralCode(enteredCode);
      if (success) {
        localStorage.setItem('usedReferralCode', enteredCode);
        setCodeUsed(true);
        const pos = parseInt(fantasyBadge.split('-')[1]);
        const newPos = Math.max(1, pos - 25);
        setFantasyBadge(`waitlist-${newPos}`);
        setWaitlistPosition(newPos);
        alert('Referral accepted! You moved up the waitlist.');
      } else {
        alert('Code not found.');
      }
    }
  };

  const handleCopyReferral = () => {
    const msg = `Help me unlock LuckyLogic faster! Use my code ${referralCode} when you join.`;
    navigator.clipboard.writeText(msg);
    alert('Referral copied to clipboard!');
  };

  const handleGenerateEntries = () => {
    const newEntries = [];
    for (let i = 0; i < entryCount; i++) {
      newEntries.push({
        name: `Entry ${i + 1}`,
        pick: generateNumbers()
      });
    }
    setEntries(newEntries);
  };

  const handleRunMatch = () => {
    const winning = generateNumbers();
    const scored = entries.map(e => ({
      ...e,
      score: calculateFantasyScore(e.pick, winning)
    }));
    const top = scored.reduce((a, b) => (b.score > a.score ? b : a));
    setResults(scored);
    setWinner(top.name);
  };

  return (
    <div className="fantasy-lobby">
      <h2>LuckyLogic Fantasy</h2>

      {rankMovedUp && <div className="rank-up-alert">Your badge moved up!</div>}
      {typeof fantasyBadge === 'number' && <div className="fantasy-unlocked">You’re user #{fantasyBadge}</div>}
      {typeof fantasyBadge === 'string' && fantasyBadge.startsWith('waitlist') && (
        <div className="fantasy-unlocked">
          All spots filled. You’re #{fantasyBadge.split('-')[1]} on the waitlist.
        </div>
      )}
      {waitlistPosition && (
        <div className="waitlist-progress">
          <div className="progress-label">Waitlist #{waitlistPosition} of 1000</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(1000 - waitlistPosition) / 10}%` }}></div>
          </div>
        </div>
      )}

      {waitlisted && (
        <>
          <div className="referral-section">
            <p>Want to skip the line?</p>
            <button className="referral-btn" onClick={handleCopyReferral}>Refer a Friend</button>
            <div className="referral-code">
              Your Code: <strong>{referralCode}</strong>
              {boostCredits > 0 && <span className="boost-credit"> (+{boostCredits})</span>}
            </div>
          </div>
          {!codeUsed && (
            <div className="referral-entry">
              <label>Enter Referral Code</label>
              <input value={enteredCode} onChange={e => setEnteredCode(e.target.value.toUpperCase())} />
              <button className="referral-btn" onClick={handleRedeemCode}>Submit</button>
            </div>
          )}
        </>
      )}

      {!waitlisted && (
        <>
          <div className="fantasy-section">
            <label>Game Mode</label>
            <select value={mode} onChange={e => setMode(e.target.value)}>
              <option value="solo">Solo Contest (FanDuel style)</option>
              <option value="multi">Multi-Entry (DraftKings style)</option>
            </select>
          </div>

          {mode === 'multi' && (
            <div className="fantasy-section">
              <label>How many entries?</label>
              <select value={entryCount} onChange={e => setEntryCount(Number(e.target.value))}>
                {[1, 2, 3, 5, 10].map(n => <option key={n}>{n}</option>)}
              </select>
              <button className="referral-btn" onClick={handleGenerateEntries}>Generate Entries</button>
            </div>
          )}

          {entries.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <button className="fantasy-start" onClick={handleRunMatch}>Run Fantasy Match</button>
            </div>
          )}

          {results.length > 0 && (
            <>
              <h3>Results</h3>
              {results.map((r, i) => (
                <div key={i} className={r.name === winner ? 'fantasy-unlocked' : 'fantasy-section'}>
                  <strong>{r.name}</strong>: {r.pick.whiteBalls.join(', ')} + [{r.pick.redBall}] → {r.score} pts
                </div>
              ))}
              <div className="rank-up-alert">Winner: <strong>{winner}</strong></div>
            </>
          )}
        </>
      )}
    </div>
  );
}