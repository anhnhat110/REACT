import React from 'react';
import './Circle.css'; // Import the CSS file

const Circle = ({ number, onClick, position, isClicked }) => {
  const size = 50; // Base size of the circle
  const fontSize = 20; // Font size for the number

  return (
    <div
      onClick={() => onClick(number)}
      className={`circle ${isClicked ? 'clicked' : ''}`}
      style={{
        top: position.y,
        left: position.x,
        width: size,
        height: size,
        fontSize: fontSize,
        zIndex: 1000 - number,
      }}
    >
      {number}
    </div>
  );
};

export default Circle;
