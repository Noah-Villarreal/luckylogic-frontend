import React, { useState } from 'react';
import './App.css';

function App() {
  const [picks, setPicks] = useState([]);

  const generatePicks = async () => {
    try {
      const response = await fetch("https://luckylogic-backend.onrender.com/api/pick");
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data = await response.json();

      const formatted = data.picks.map(
        ([nums, power]) => `${nums.join(', ')} + PB: ${power}`
      );
      setPicks(formatted);
    } catch (error) {
      console.error("Error fetching picks:", error);
      setPicks(["Failed to fetch picks"]);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎰 LuckyLogic Powerball Picks</h1>
      <button
        onClick={generatePicks}
        style={{ fontSize: "1.2rem", padding: "0.5rem 1rem" }}
      >
        Generate Picks
      </button>
      <div style={{ marginTop: "2rem" }}>
        {picks.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
