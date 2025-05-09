import React from 'react';

export default function HistoryList({ title, picks, renderPickRow }) {
  return (
    <div className="history-section">
      <h2 style={{ marginTop: '1.5rem' }}>{title}</h2>
      <div className="history-list">
        {picks.length > 0 ? picks.map(pick => renderPickRow(pick, true)) : (
          <p style={{ color: '#777' }}>No picks to show yet.</p>
        )}
      </div>
    </div>
  );
}
