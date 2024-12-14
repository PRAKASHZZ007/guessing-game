import React, { useState, useEffect } from "react";
import Gameplay from "../Gameplay/Gameplay";
import Leaderboard from "../LeaderBoard/Leaderboard";
import "./Home.css";

function generateUniqueFourDigitNumber() {
  const digits = new Set();
  while (digits.size < 4) {
    const randomDigit = Math.floor(Math.random() * 10);
    digits.add(randomDigit);
  }
  const number = parseInt([...digits].join(""), 10);
  console.log("Computer's Number:", number);
  return number;
}

const Home = () => {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [timer, setTimer] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [computerNumber, setComputerNumber] = useState(null);
  const [gameEnded, setGameEnded] = useState(false); 

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted]);

  const startNewGame = () => {
    const name = prompt("Enter your name:");
    if (!name) return;
    setPlayerName(name);
    setGameStarted(true);
    setGameEnded(false); 
    setGuesses([]);
    setCurrentGuess("");
    setTimer(0);
    setComputerNumber(generateUniqueFourDigitNumber());
  };

  const handleGuess = () => {
    if (currentGuess.length !== 4 || isNaN(currentGuess) || new Set(currentGuess).size !== 4) {
      alert("Please enter a valid 4-digit number with unique digits");
      return;
    }

    const feedback = getFeedback(currentGuess, computerNumber);
    setGuesses([...guesses, { userGuess: currentGuess, feedback }]);

    if (currentGuess === String(computerNumber)) {
      alert(`Congratulations ${playerName}! You guessed the number in ${guesses.length + 1} moves and ${timer} seconds.`);
      setGameStarted(false);
      setGameEnded(true);
      updateLeaderboard(playerName, timer, guesses.length + 1);
    }

    setCurrentGuess("");
  };

  const getFeedback = (guess, target) => {
    let feedback = "";
    const guessArr = guess.split("");
    const targetArr = String(target).split("");

    guessArr.forEach((digit, index) => {
      if (digit === targetArr[index]) {
        feedback += "+";
      } else if (targetArr.includes(digit)) {
        feedback += "-";
      }
    });

    return feedback;
  };

  const updateLeaderboard = (name, time, guesses) => {
    const newLeaderboard = [...leaderboard, { name, time, guesses }];
    newLeaderboard.sort((a, b) => a.time - b.time);
    setLeaderboard(newLeaderboard);
  };

  return (
    <div className="home-container">
      {!gameStarted ? (
        <button onClick={startNewGame} className="home-container-button">
          Start Game
        </button>
      ) : (
        <Gameplay
          playerName={playerName}
          timer={timer}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          handleGuess={handleGuess}
          guesses={guesses}
        />
      )}
      {gameEnded && <Leaderboard leaderboard={leaderboard} />} 
    </div>
  );
};

export default Home;
