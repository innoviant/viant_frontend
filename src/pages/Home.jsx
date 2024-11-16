import React from "react";
import { URLs } from "../__data__/URLs";
import TarotCarousel from "../components/compat/TarotCarousel.jsx";
import "./css/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-content">
        <h1 className="home-title">Анализ совместимости для вашей команды</h1>
        <p className="description">
          Наш сервис поможет вам быстро определить уровень соответствия между
          коллегами, руководителями и кандидатами, предоставляя
          персонализированные рекомендации и предсказания для успешной работы в
          коллективе.
        </p>
        <a href={URLs.setup} className="calculate-button">
          Рассчитать совместимость
        </a>
      </div>
      <div className="platform-features-container">
        <h2 className="features-title">Возможности платформы</h2>
        <div className="platform-carousel">
          <TarotCarousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
