import './App.css'

function App() {
  const handlePlay = () => {
    window.location.href = "game.html";
  };

  return (
    <div className="app-container">
      <div className="pony-emoji" role="img" aria-label="Unicorn" style={{ fontSize: '7rem', marginBottom: '20px' }}>
        🦄
      </div>
      <h1>My Little Pony Memory Game</h1>
      <button className="play-btn" onClick={handlePlay}>
        Play
      </button>
    </div>
  );
}

export default App
