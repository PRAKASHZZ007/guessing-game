import React from 'react';
import "./Gameplay.css"
const Gameplay = ({
  playerName,
  timer,
  currentGuess,
  setCurrentGuess,
  handleGuess,
  guesses
}) => {
  return (
    <div className="gameplay-container">
      <h2 className="player-name">Player: {playerName}</h2>
      <h3 className="timer">Timer: {timer}s</h3>
      <input
        className="guess-input"
        type="text"
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value)}
        maxLength={4}
        placeholder="Enter your guess"
      />
      <button className="submit-button" onClick={handleGuess}>
        Submit Guess
      </button>
      <div className="guesses-container">
        
        <ul className="guesses-list">
          {guesses.map((entry, index) => (
            <li className="guess-item" key={index}>
              Guess: {entry.userGuess}, Result: {entry.feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gameplay;
