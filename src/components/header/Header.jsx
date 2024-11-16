import React from 'react';
import {URLs} from "../../__data__/URLs";

const Header = () => {
  return (
      <div>
          <div className="color-circle circle-top-right color-circle-orange"/>
          <div className="color-circle circle-bottom-left color-circle-green"/>

          <div className="header-nav">
              <a href="/">Кабинет</a>
              <a href={URLs.login}>Регистрация</a>
          </div>

      </div>
  );
};

export default Header;
