import React from 'react';
<<<<<<< HEAD
import { FaHeart, FaRegHeart, FaCalendarAlt } from 'react-icons/fa';
=======
import { FaHeart, FaRegHeart, FaCalendarAlt, FaStar } from 'react-icons/fa';
>>>>>>> d4248c2 (Update logo and styles)

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
<<<<<<< HEAD
=======
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

>>>>>>> d4248c2 (Update logo and styles)
  const ballStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    margin: '0 2px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
  };

  const renderTag = (tag, i) => (
    <span key={i} style={{
      backgroundColor: '#f1f1f1',
      color: '#333',
      fontSize: '0.7rem',
      padding: '4px 8px',
      borderRadius: '12px',
      margin: '4px 4px 0 0',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      <span>{tag}</span>
    </span>
  );

  return (
    <div
      className={`pick-row ${type === 'daily' ? 'daily-pick' : ''}`}
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        margin: '12px auto',
        maxWidth: '600px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        fontSize: '0.95rem',
        position: 'relative'
      }}
    >
      {/* TOP ROW: Date + Balls + Heart */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Date */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: '#666',
          fontSize: '0.85rem'
        }}>
          <FaCalendarAlt style={{ marginRight: 6 }} />
          {formatDate ? formatDate(date) : new Date(date).toLocaleDateString()}
        </div>

        {/* Balls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          overflowX: 'auto'
        }}>
=======
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
>>>>>>> d4248c2 (Update logo and styles)
          {numbers.map((num, i) => (
            <div
              key={i}
              style={{
                ...ballStyle,
<<<<<<< HEAD
                backgroundColor: '#fff',
                color: '#333',
                border: '1px solid #ccc'
=======
                backgroundColor: '#ffffff',
                color: '#333',
                border: '1px solid #aaa'
>>>>>>> d4248c2 (Update logo and styles)
              }}
            >
              {num}
            </div>
          ))}
          <div
            style={{
              ...ballStyle,
<<<<<<< HEAD
              backgroundColor: '#d32f2f',
=======
              backgroundColor: '#d12f2f',
>>>>>>> d4248c2 (Update logo and styles)
              color: '#fff',
              border: '1px solid #a00'
            }}
          >
            {powerball}
          </div>
        </div>

<<<<<<< HEAD
        {/* Heart */}
        <button
          onClick={onToggleFavorite}
          style={{
            fontSize: '1.3rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: isFavorite ? 'red' : '#bbb',
            marginLeft: 10
          }}
          title={isFavorite ? 'Unfavorite' : 'Favorite'}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* TAGS ROW */}
      {Array.isArray(tags) && tags.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap' }}>
          {tags.map((tag, i) => renderTag(tag, i))}
        </div>
      )}
=======
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
>>>>>>> d4248c2 (Update logo and styles)
    </div>
  );
}
