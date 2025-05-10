
import React from 'react';

export default function ControlsBar({
  onGenerate,
  onDailyPick,
  dailyPickAvailable,
  tab,
  setTab
}) {
  return (
    <div className="controls">
      <button className="generate-button" onClick={onGenerate}>
        Generate Powerball Numbers
      </button>

      {dailyPickAvailable && (
        <button className="daily-button" onClick={onDailyPick}>
          Get Daily Lucky Pick ✨
        </button>
      )}

      <button className="toggle-button" onClick={() => setTab(tab === 'favorites' ? 'main' : 'favorites')}>
        {tab === 'favorites' ? 'Show Main' : 'Show Favorites'}
      </button>

      <button className="toggle-button" onClick={() => setTab(tab === 'history' ? 'main' : 'history')}>
        {tab === 'history' ? 'Show Main' : 'Show History'}
      </button>

      <button className="toggle-button" onClick={() => setTab(tab === 'personal' ? 'main' : 'personal')}>
        {tab === 'personal' ? 'Show Main' : 'Your Numbers'}
      </button>
    </div>
  );
}
