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

  useEffect(() => {
    // Pick images for pairs
    const selectedImages = shuffle(images).slice(0, numPairs);
    const cardImages = shuffle([...selectedImages, ...selectedImages]);
    setCards(cardImages);
    setShowAll(true);
    const timer = setTimeout(() => setShowAll(false), 5000);
    return () => clearTimeout(timer);
  }, [rows, cols]);

  return (
    <div className="game-container">
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
        {cards.map((img, idx) => (
          <button
            className="game-btn"
            key={idx}
            style={{ width: '120px', height: '120px' }}
          >
            {showAll ? (
              <img src={img} alt="card" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            ) : (
              "?"
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
