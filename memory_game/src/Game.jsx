import './App.css';

function Game({ rows, cols }) {
  const total = rows * cols;
  const buttons = Array.from({ length: total });

  return (
    <div className="game-container">
      <div
        className="game-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 60px)`,
          gridTemplateRows: `repeat(${rows}, 60px)`,
          gap: '12px',
          justifyContent: 'center',
          margin: '30px 0'
        }}
      >
        {buttons.map((_, idx) => (
          <button className="game-btn" key={idx}>
            ?
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
