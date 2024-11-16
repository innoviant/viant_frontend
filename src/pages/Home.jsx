import React from 'react';
import {URLs} from "../__data__/URLs";

const Home = () => {
  return (
      <div className="innoviant-wrapper">
          <h1>Home</h1>
          <a href={URLs.auth}>Sign In!</a>
          <a href={URLs.setup}>Посчитать совместимость</a>
      </div>
  );
};

export default Home;
