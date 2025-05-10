

import React from 'react';

export default function PickDisplay({ pick, onFavoriteToggle, isFavorite }) {
  return (
    <div className={`pick-row ${pick.type === 'daily' ? 'daily-pick' : ''}`}>
      <div className="pick-numbers">
        {pick.numbers.map((num, index) => (
          <div key={index} className="ball white-ball history-ball">{num}</div>
        ))}
        <div className="ball red-ball history-ball">{pick.powerball}</div>
      </div>
      <button className="heart-button" onClick={() => onFavoriteToggle(pick)}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
