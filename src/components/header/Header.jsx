import React, {useEffect, useState} from 'react';
import {URLs} from "../../__data__/URLs";

const Header = () => {
    const [showCircles, setShowCircles] = useState(false);

    useEffect(() => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const delayRendering = async () => {
            await sleep(1000);
            setShowCircles(true);
        };

        delayRendering().then();
    }, []);

  return (
      <div className="header-wrapper">
          {showCircles && (
              <div>
                  <div className="color-circle circle-top-right color-circle-orange"/>
                  <div className="color-circle circle-bottom-left color-circle-green"/>
              </div>
          )}


          <a className="header-title" href={URLs.home}>Innoviant</a>

          <div className="header-nav">
              <a href={URLs.account}>Кабинет</a>
              <a href={URLs.reg}>Регистрация</a>
          </div>

      </div>
  );
};

export default Header;
