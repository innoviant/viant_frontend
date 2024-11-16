import React, { useState } from "react";
import "./tarotCarousel.css";

const TarotCarousel = () => {
  const tarotImages = [
    `${process.env.PUBLIC_URL}/tarotcard.png`,
    `${process.env.PUBLIC_URL}/tarotcard1.png`,
    `${process.env.PUBLIC_URL}/tarotcard2.png`,
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const totalCards = tarotImages.length;

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? totalCards - 1 : prevIndex - 1
    );
  };

  return (
    <div className="card-carousel-container">
      <button onClick={handlePrev} className="carousel-button prev-button">
        ❮
      </button>

      {}
      <div className="card-display">
        <img
          src={tarotImages[currentCardIndex]}
          alt={`Tarot Card ${currentCardIndex + 1}`}
          className="car-tarot-card"
        />
      </div>

      <button onClick={handleNext} className="carousel-button next-button">
        ❯
      </button>
    </div>
  );
};

export default TarotCarousel;
