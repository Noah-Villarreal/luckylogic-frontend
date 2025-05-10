import React from 'react';

export default function PersonalInput({
  showInput,
  setShowInput,
  manualNumbers,
  setManualNumbers,
  savePersonalPick,
  personalPicks,
  renderPickRow
}) {
  return (
    <>
      <div className="controls" style={{ marginTop: '2rem' }}>
        <button className="daily-button" onClick={() => setShowInput(!showInput)}>
          {showInput ? 'Cancel' : '➕ Add Lucky Numbers'}
        </button>
      </div>

      {showInput && (
        <div style={{ margin: '1rem auto', textAlign: 'center' }}>
          <div>
            {[0, 1, 2, 3, 4].map(i => (
              <input
                key={i}
                type="number"
                placeholder={`White ${i + 1}`}
                min={1}
                max={69}
                value={manualNumbers.numbers[i]}
                onChange={(e) => {
                  const newNums = [...manualNumbers.numbers];
                  newNums[i] = e.target.value;
                  setManualNumbers({ ...manualNumbers, numbers: newNums });
                }}
                style={{ width: 60, margin: 4 }}
              />
            ))}
            <input
              type="number"
              placeholder="Powerball"
              min={1}
              max={26}
              value={manualNumbers.powerball}
              onChange={(e) =>
                setManualNumbers({ ...manualNumbers, powerball: e.target.value })
              }
              style={{ width: 80, margin: 4, fontWeight: 'bold', borderColor: 'red' }}
            />
          </div>
          <button className="generate-button" style={{ marginTop: 12 }} onClick={savePersonalPick}>
            Save My Numbers
          </button>
        </div>
      )}

      <div className="history-list">
        {personalPicks.map((pick) => renderPickRow(pick, true))}
      </div>
    </>
  );
}
