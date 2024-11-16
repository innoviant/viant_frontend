import React from "react";
import { URLs } from "../__data__/URLs";
import TarotCarousel from "../components/compat/TarotCarousel.jsx";

const Home = () => {
  return (
    <div className="innoviant-wrapper">
      <h1>Home</h1>
      <TarotCarousel />
      <a href={URLs.auth}>Sign In!</a>
      <a href={URLs.setup}>Посчитать совместимость</a>
    </div>
  );
};

export default Home;
