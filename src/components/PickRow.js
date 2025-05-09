import React from 'react';
import { FaHeart, FaRegHeart, FaCalendarAlt, FaStar } from 'react-icons/fa';

export default function PickRow({
  numbers = [],
  powerball,
  tags = [],
  date,
  isFavorite = false,
  onToggleFavorite,
  formatDate,
  type = 'regular'
}) {
  const tagDescriptions = {
    '⚡ Low Total': 'Sum of numbers is under 100 – rare and risky!',
    '💥 High Total': 'Sum is over 150 – statistically unusual.',
    '♻️ Repeat Detected': 'Some numbers have appeared recently.',
    '🧊 All Even': 'All white balls are even – uncommon combo.',
    '🔥 All Odd': 'All white balls are odd – another rare set.',
    '🎯 Edge Powerball': 'Powerball is 1 or 26 – right on the edge!',
    '🍀 Lucky 7': 'The number 7 showed up – considered lucky.',
    '😈 Bold 13': 'The number 13 is here – bold or unlucky?',
    '📏 Tight Range': 'All numbers are within 20 of each other.',
    '🎲 Spread Pick': 'Wide spread across low and high numbers.',
    '🔎 Mystery Pattern': 'No strong pattern detected.'
  };

  const ballStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    margin: '2px',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      margin: '8px auto',
      maxWidth: '580px',
      backgroundColor: type === 'daily' ? '#fff4e6' : '#fff',
      border: type === 'daily' ? '2px solid #ffa726' : '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '1.05rem',
      lineHeight: '1.6',
      position: 'relative'
    }}>
      <div style={{ flex: 1 }}>
        {type === 'daily' && (
          <div style={{
            backgroundColor: '#ffa726',
            color: '#fff',
            fontWeight: 'bold',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '6px'
          }}>
            <FaStar /> Daily Lucky Pick
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <strong style={{ marginRight: 8 }}>Numbers:</strong>
          {numbers.map((num, i) => (
            <div
              key={i}
              style={{
                ...ballStyle,
                backgroundColor: '#ffffff',
                color: '#333',
                border: '1px solid #aaa'
              }}
            >
              {num}
            </div>
          ))}
          <div
            style={{
              ...ballStyle,
              backgroundColor: '#d12f2f',
              color: '#fff',
              border: '1px solid #a00'
            }}
          >
            {powerball}
          </div>
        </div>

        {Array.isArray(tags) && tags.length > 0 && (
          <div style={{ marginTop: 8, fontSize: '1.05rem', color: '#333' }}>
            {tags.map((tag, i) => (
              <div key={i}>🔹 {tag}</div>
            ))}
          </div>
        )}

        {date && (
          <div style={{ marginTop: 8, fontSize: '0.95rem', color: '#555', display: 'flex', alignItems: 'center' }}>
            <FaCalendarAlt style={{ marginRight: 6 }} />
            {formatDate ? formatDate(date) : new Date(date).toLocaleDateString()}
          </div>
        )}
      </div>

      <button
        onClick={onToggleFavorite}
        style={{
          fontSize: '1.4rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isFavorite ? 'red' : '#bbb',
          marginLeft: '12px'
        }}
        title={isFavorite ? 'Unfavorite' : 'Favorite'}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
}
