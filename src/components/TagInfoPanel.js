import React, { useState } from 'react';

const TAGS = {
  '⚡ Low Total': 'Sum under 100 – rare and risky.',
  '💥 High Total': 'Sum over 150 – statistically unusual.',
  '♻️ Repeat Detected': 'Repeats numbers from recent draws.',
  '🧊 All Even': 'All white balls are even – uncommon.',
  '🔥 All Odd': 'All white balls are odd – rare.',
  '🎯 Edge Powerball': 'Powerball is 1 or 26 – edge numbers.',
  '🍀 Lucky 7': 'Includes 7 – often seen as lucky.',
  '😈 Bold 13': 'Includes 13 – bold or unlucky?',
  '📏 Tight Range': 'All numbers are within 20 of each other.',
  '🎲 Spread Pick': 'Wide mix from low and high numbers.',
  '🔎 Mystery Pattern': 'No strong pattern detected.'
};

export default function TagInfoPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        title="What do the tags mean?"
      >
        ?
      </button>

      {open && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '300px',
          height: '100%',
          backgroundColor: '#fff',
          borderLeft: '1px solid #ccc',
          boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
          zIndex: 1001,
          padding: '20px',
          overflowY: 'auto'
        }}>
          <h3 style={{ marginTop: 0 }}>Tag Meanings</h3>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {Object.entries(TAGS).map(([tag, desc]) => (
              <li key={tag} style={{ marginBottom: '12px' }}>
                <strong>{tag}</strong><br />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>{desc}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setOpen(false)}
            style={{
              marginTop: 20,
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
