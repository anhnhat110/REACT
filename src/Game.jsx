import React, { useState, useEffect, useRef } from 'react';
import Circle from './Circle';
import Timer from './Timer';
import Button from './Button';
import './Game.css'; // Import the CSS file

const getRandomPosition = (container) => {
  const { offsetWidth, offsetHeight } = container.current;
  return {
    x: Math.floor(Math.random() * (offsetWidth - 50)),
    y: Math.floor(Math.random() * (offsetHeight - 50)),
  };
};

const generateCircles = (count, container) => {
  const circles = [];
  for (let i = 1; i <= count; i++) {
    circles.push({
      number: i,
      position: getRandomPosition(container),
    });
  }
  return circles;
};

const Game = () => {
  const [circles, setCircles] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [error, setError] = useState(false);
  const [win, setWin] = useState(false);
  const [pointInput, setPointInput] = useState(5); // Default number of circles
  const containerRef = useRef(null); // Reference to the container

  const startTimer = () => {
    const id = setInterval(() => {
      setGameTime((prevTime) => +(prevTime + 0.1).toFixed(1)); // Round to 1 decimal place while updating
    }, 100);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    if (gameStarted) {
      startTimer();
    }
    return () => stopTimer(); // Cleanup interval on unmount or when game stops
  }, [gameStarted]);

  const startGame = () => {
    if (pointInput <= 0) {
      setError(true);
      return;
    }
    setCircles(generateCircles(pointInput, containerRef));
    setCurrentNumber(1);
    setGameStarted(true);
    setGameTime(0);
    setError(false);
    setWin(false);
  };

  const restartGame = () => {
    stopTimer();
    startGame();
  };

  const handleCircleClick = (number) => {
    if (number === currentNumber) {
      setTimeout(() => {
        setCircles(prevCircles =>
          prevCircles.map(circle =>
            circle.number === number
              ? { ...circle, isClicked: true }
              : circle
          )
        );

        if (currentNumber === pointInput) {
          setGameStarted(false);
          setError(false);
          setWin(true);
          stopTimer(); // Stop the timer
        } else {
          setCurrentNumber(currentNumber + 1);
        }

        // Remove the circle after an additional delay of 1 second
        setTimeout(() => {
          setCircles(prevCircles =>
            prevCircles.filter(circle => circle.number !== number)
          );
        }, 2000); // 1 second delay before removing the circle
      }, 0); // No delay before changing the color
    } else {
      setGameStarted(false);
      setError(true);
      stopTimer(); // Stop the timer
    }
  };

  return (
    <div className="game-container">
      <div className="title-container">
        {error ? (
          <div className="error-message">GAME OVER !</div>
        ) : win ? (
          <div className="win-message">GOOD JOB !</div>
        ) : (
          <div className="default-message">LET'S PLAY !</div>
        )}
      </div>
      <div className="point-container">
        <label htmlFor="points">Number of Points:</label>
        <input
          type="text"
          id="points"
          value={pointInput}
          onChange={(e) => setPointInput(Number(e.target.value))}
          min="1"
        />
        <Button onClick={startGame} label={gameStarted ? "Restart" : "Play"} />
      </div>
      <div className="timer-container">
        <Timer time={gameTime} />
      </div>
      <div
        ref={containerRef}
        className="circle-container"
      >
        {circles.map(circle => (
          <Circle
            key={circle.number}
            number={circle.number}
            onClick={handleCircleClick}
            position={circle.position}
            isClicked={circle.isClicked}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
