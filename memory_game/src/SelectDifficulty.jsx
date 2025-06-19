import './App.css';

function SelectDifficulty() {
  const handleSelect = (mode) => {
    // You can change this to use React Router or state as needed
    window.location.href = `game.html?mode=${mode}`;
  };

  return (
    <div className="app-container">
      <div className="pony-emoji" role="img" aria-label="Unicorn" style={{ fontSize: '5rem', marginBottom: '20px' }}>
        🦄
      </div>
      <h1>Select Difficulty</h1>
      <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column', alignItems: 'center' }}>
        <button className="play-btn" onClick={() => handleSelect('easy')}>
          Easy (4x4)
        </button>
        <button className="play-btn" onClick={() => handleSelect('medium')}>
          Medium (4x6)
        </button>
        <button className="play-btn" onClick={() => handleSelect('hard')}>
          Hard (6x6)
        </button>
      </div>
    </div>
  );
}

export default SelectDifficulty;
