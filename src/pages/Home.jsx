import React from 'react';
import {URLs} from "../__data__/URLs";

const Home = () => {
  return (
      <div className="innoviant-title">
          <h1>Innoviant</h1>
          <a href={URLs.login}>Sign In!</a>
      </div>
  );
};

export default Home;
