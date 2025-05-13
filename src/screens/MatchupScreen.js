import React, { useEffect, useState } from 'react';
import '../styles/Matchup.css';

const actualResult = {
  gameType: 'powerball',
  whiteBalls: [14, 23, 37, 48, 56],
  bonusBall: 11
};

const userDraft = {
  username: 'You',
  whiteBalls: [14, 22, 37, 40, 56],
  bonusBall: 11,
  isDaily: true
};

const opponentDraft = {
  username: 'Opponent',
  whiteBalls: [10, 23, 35, 48, 60],
  bonusBall: 3,
  isDaily: false
};

function calculateScore(draft, result) {
  const whiteMatches = draft.whiteBalls.filter(n => result.whiteBalls.includes(n)).length;
  const bonusMatch = draft.bonusBall === result.bonusBall;
  const isJackpot = whiteMatches === 5 && bonusMatch;

  let score = 0;

  if (whiteMatches === 1) score += 1;
  else if (whiteMatches === 2) score += 3;
  else if (whiteMatches === 3) score += 6;
  else if (whiteMatches === 4) score += 10;
  else if (whiteMatches === 5) score += 25;

  if (bonusMatch) score += 10;
  if (isJackpot) score += 50;
  if (draft.isDaily) score += 5;

  return { score, whiteMatches, bonusMatch, isJackpot };
}

export default function MatchupScreen() {
  const userStats = calculateScore(userDraft, actualResult);
  const opponentStats = calculateScore(opponentDraft, actualResult);
  const winner =
    userStats.score > opponentStats.score ? userDraft.username :
    opponentStats.score > userStats.score ? opponentDraft.username :
    'Tie';

  const [userDisplayScore, setUserDisplayScore] = useState(0);
  const [oppDisplayScore, setOppDisplayScore] = useState(0);

  useEffect(() => {
    const saveMatch = () => {
      const record = {
        timestamp: new Date().toISOString(),
        gameType: actualResult.gameType,
        user: { ...userDraft, ...userStats },
        opponent: { ...opponentDraft, ...opponentStats },
        winner
      };

      const history = JSON.parse(localStorage.getItem('matchupHistory')) || [];
      const updated = [record, ...history].slice(0, 50);
      localStorage.setItem('matchupHistory', JSON.stringify(updated));
    };

    const animateScore = (target, setter) => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setter(count);
        if (count >= target) clearInterval(interval);
      }, 50);
    };

    saveMatch();
    animateScore(userStats.score, setUserDisplayScore);
    animateScore(opponentStats.score, setOppDisplayScore);
  }, []);

  return (
    <div className="matchup-container">
      <h2>Fantasy Matchup</h2>

      <div className="matchup-grid">
        {[userDraft, opponentDraft].map((draft, i) => {
          const stats = i === 0 ? userStats : opponentStats;
          const displayScore = i === 0 ? userDisplayScore : oppDisplayScore;
          const isWinner = draft.username === winner;

          return (
            <div key={i} className={`player-card ${isWinner ? 'winner' : ''}`}>
              <h3>{draft.username}</h3>
              <p className="score-label">
                Score: <span className="score-count">{displayScore}</span>
              </p>
              <div className="ball-row">
                {draft.whiteBalls.map((n, i) => (
                  <span
                    key={i}
                    className={`ball ${actualResult.whiteBalls.includes(n) ? 'matched-glow' : ''}`}
                  >
                    {n}
                  </span>
                ))}
                <span
                  className={`ball red ${draft.bonusBall === actualResult.bonusBall ? 'matched-glow' : ''}`}
                >
                  {draft.bonusBall}
                </span>
              </div>
              <div className="match-stats">
                <p>White Matches: {stats.whiteMatches}</p>
                <p>Bonus Match: {stats.bonusMatch ? 'Yes' : 'No'}</p>
                {stats.isJackpot && <p className="jackpot">JACKPOT!</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`winner-banner animated-banner`}>
        {winner === 'Tie' ? 'It’s a Tie!' : `${winner} Wins!`}
      </div>
    </div>
  );
}