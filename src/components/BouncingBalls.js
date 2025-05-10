
import React from 'react';

export default function BouncingBalls({ latestPick, animationId }) {
  if (!latestPick) return null;

  const displayTime = 300;
  const totalBalls = [...latestPick.numbers, latestPick.powerball];

  return (
    <div key={animationId} className="bouncy-castle-row">
      {totalBalls.map((num, index) => (
        <div key={index} className="bouncy-castle">
          <div className={`ball ${index < 5 ? 'white-ball' : 'red-ball'} bounce bounce-delay-${index}`}>
            <span style={{
              visibility: 'hidden',
              animation: `fadeIn 1.4s ease-in-out forwards`,
              animationDelay: `${index * displayTime}ms`,
              display: 'inline-block'
            }}>
              {num}
            </span>
          </div>
          <div className={`ball-shadow bounce-shadow bounce-delay-${index}`}></div>
        </div>
      ))}
    </div>
  );
}
