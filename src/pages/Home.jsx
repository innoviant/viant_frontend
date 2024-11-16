import React from 'react';
import {URLs} from "../__data__/URLs";

const Home = () => {
  return (
      <div className="innoviant-title">
          <h1>Home</h1>
          <a href={URLs.auth}>Sign In!</a>
      </div>
  );
};

export default Home;
