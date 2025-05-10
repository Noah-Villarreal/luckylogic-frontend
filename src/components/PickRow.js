import React from 'react';
import { FaHeart, FaRegHeart, FaCalendarAlt } from 'react-icons/fa';

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
  const ballStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
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
          {numbers.map((num, i) => (
            <div
              key={i}
              style={{
                ...ballStyle,
                backgroundColor: '#fff',
                color: '#333',
                border: '1px solid #ccc'
              }}
            >
              {num}
            </div>
          ))}
          <div
            style={{
              ...ballStyle,
              backgroundColor: '#d32f2f',
              color: '#fff',
              border: '1px solid #a00'
            }}
          >
            {powerball}
          </div>
        </div>

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
    </div>
  );
}
