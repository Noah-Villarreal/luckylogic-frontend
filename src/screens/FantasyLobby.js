import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { unlockFantasyAccess } from '../utils/unlockFantasy';
import { registerReferralCode, redeemReferralCode } from '../utils/referralService';
import '../styles/FantasyLobby.css';

export default function FantasyLobby() {
  const [gameMode, setGameMode] = useState('daily');
  const [gameType, setGameType] = useState('powerball');
  const [draftType, setDraftType] = useState('manual');
  const [fantasyBadge, setFantasyBadge] = useState(null);
  const [waitlisted, setWaitlisted] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState(null);
  const [rankMovedUp, setRankMovedUp] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [boostCredits, setBoostCredits] = useState(0);
  const [enteredCode, setEnteredCode] = useState('');
  const [codeUsed, setCodeUsed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const existingCode = localStorage.getItem('fantasyReferralCode');
    const existingCredits = localStorage.getItem('boostCredits');
    const usedCode = localStorage.getItem('usedReferralCode');

    let newCode = existingCode;
    if (!existingCode) {
      newCode = 'LL-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      localStorage.setItem('fantasyReferralCode', newCode);
    }

    setReferralCode(newCode);
    setBoostCredits(parseInt(existingCredits) || 0);
    setCodeUsed(!!usedCode);

    registerReferralCode(newCode);

    const result = unlockFantasyAccess();

    if (result.unlocked) {
      const previous = localStorage.getItem('previousFantasyNumber');
      if (previous && parseInt(previous) > result.number) {
        setRankMovedUp(true);
      }
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

  const handleStartDraft = () => {
    navigate('/draft', {
      state: { gameType, gameMode, draftType },
    });
  };

  const handleCopyReferral = () => {
    const message = `Help me unlock LuckyLogic faster! Use my code ${referralCode} when you join.`;
    navigator.clipboard.writeText(message);
    alert('Referral message copied to clipboard!');
  };

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
        const boostedPos = Math.max(1, pos - 25);
        setFantasyBadge(`waitlist-${boostedPos}`);
        setWaitlistPosition(boostedPos);

        alert('Referral accepted! You moved up the waitlist.');
      } else {
        alert('Code not found.');
      }
    } else {
      alert('Invalid or already used code.');
    }
  };

  return (
    <div className="fantasy-lobby">
      <h2>LuckyLogic Fantasy Lobby</h2>

      {rankMovedUp && (
        <div className="rank-up-alert">
          Your fantasy badge just moved up! Keep checking in to climb higher.
        </div>
      )}

      {typeof fantasyBadge === 'number' && (
        <div className="fantasy-unlocked">
          You’re user #{fantasyBadge} to unlock LuckyLogic Fantasy Mode!
        </div>
      )}

      {typeof fantasyBadge === 'string' && fantasyBadge.startsWith('waitlist') && (
        <div className="fantasy-unlocked">
          You’ve qualified for Fantasy Mode, but all 1,000 spots are currently filled.<br />
          You’re currently <strong>#{fantasyBadge.split('-')[1]}</strong> on the waitlist.
        </div>
      )}

      {waitlistPosition && (
        <div className="waitlist-progress">
          <div className="progress-label">
            Waitlist Position: #{waitlistPosition} of 1000
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(1000 - waitlistPosition) / 10}%` }}
            ></div>
          </div>
        </div>
      )}

      {waitlisted && (
        <>
          <div className="referral-section">
            <p>Want to skip the line?</p>
            <button className="referral-btn" onClick={handleCopyReferral}>
              Boost My Rank (Refer a Friend)
            </button>
            <div className="referral-code">
              Your Code: <strong>{referralCode}</strong>
              {boostCredits > 0 && (
                <span className="boost-credit"> (+{boostCredits} boost)</span>
              )}
            </div>
          </div>

          {!codeUsed && (
            <div className="referral-entry">
              <label htmlFor="codeInput">Have a referral code?</label>
              <input
                id="codeInput"
                type="text"
                placeholder="Enter code here"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
              />
              <button className="referral-btn" onClick={handleRedeemCode}>
                Submit
              </button>
            </div>
          )}
        </>
      )}

      <div className="fantasy-section">
        <label>Game Mode:</label>
        <select value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
          <option value="daily">Daily Matchup</option>
          <option value="weekly">Weekly Matchup</option>
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

      <button className="fantasy-start" onClick={handleStartDraft}>
        Start Draft
      </button>
    </div>
  );
}