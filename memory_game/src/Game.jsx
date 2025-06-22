import { useEffect, useState } from 'react';
// import './index.css';

// Helper to import all images from assets/
const importAllImages = () => {
  const context = import.meta.glob('./assets/*.{png,jpg,jpeg,svg}', { eager: true });
  return Object.values(context).map(mod => mod.default);
};
const images = importAllImages();

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Game({ rows, cols }) {
  const total = rows * cols;
  const numPairs = total / 2;

  // Prepare shuffled cards with pairs of images
  const [cards, setCards] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [selected, setSelected] = useState([]); // indices of selected cards
  const [matched, setMatched] = useState([]); // indices of matched cards
  const [lose, setLose] = useState(false);

  useEffect(() => {
    // Pick images for pairs
    const selectedImages = shuffle(images).slice(0, numPairs);
    const cardImages = shuffle([...selectedImages, ...selectedImages]);
    setCards(cardImages);
    setShowAll(true);
    setCountdown(5);
    setSelected([]);
    setMatched([]);
    setLose(false);
    const timer = setTimeout(() => setShowAll(false), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [rows, cols]);

  useEffect(() => {
    let interval;
    if (showAll) {
      setCountdown(5);
      interval = setInterval(() => {
        setCountdown(prev => prev > 1 ? prev - 1 : 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showAll]);

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (cards[first] === cards[second]) {
        setMatched(prev => [...prev, first, second]);
        setTimeout(() => setSelected([]), 800);
      } else {
        setLose(true);
      }
    }
  }, [selected, cards]);

  const handleCardClick = idx => {
    if (showAll || matched.includes(idx) || selected.includes(idx) || lose) return;
    if (selected.length < 2) {
      setSelected(prev => [...prev, idx]);
    }
  };

  return (
    <div className="game-container">
      {showAll && (
        <p className="memorize-message">
          Memorize the cards! {countdown}
        </p>
      )}
      {lose && (
        <p className="lose-message">
          You lost! Try again!
        </p>
      )}
      <div
        className="game-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 120px)`,
          gridTemplateRows: `repeat(${rows}, 120px)`,
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px auto',
        }}
      >
        {cards.map((img, idx) => {
          const isRevealed = showAll || matched.includes(idx) || selected.includes(idx);
          return (
            <button
              className={`game-btn${isRevealed ? ' revealed' : ''}`}
              key={idx}
              style={{ width: '120px', height: '120px' }}
              onClick={() => handleCardClick(idx)}
              disabled={isRevealed || lose}
            >
              {isRevealed ? (
                <img src={img} alt="card" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
              ) : (
                "?"
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Game;
