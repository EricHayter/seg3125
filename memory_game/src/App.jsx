import { useState } from 'react';
import './App.css';
import SelectDifficulty from './SelectDifficulty';

function App() {
  const [showSelect, setShowSelect] = useState(false);

  const handlePlay = () => {
    setShowSelect(true);
  };

  if (showSelect) {
    return <SelectDifficulty />;
  }

  return (
    <div className="app-container">
      <div className="pony-emoji main-pony-emoji" role="img" aria-label="Unicorn">
        🦄
      </div>
      <h1>My Little Pony Memory Game</h1>
      <button className="play-btn" onClick={handlePlay}>
        Play
      </button>
    </div>
  );
}

export default App;
