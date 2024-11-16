import React from 'react';
import {URLs} from "../../__data__/URLs";

const Header = () => {
  return (
      <div className="header-wrapper">
          <div className="color-circle circle-top-right color-circle-orange"/>
          <div className="color-circle circle-bottom-left color-circle-green"/>

          <a className="header-title" href={URLs.home}>Innoviant</a>


          <div className="header-nav">
              <a href={URLs.account}>Кабинет</a>
              <a href={URLs.auth}>Регистрация</a>
          </div>

      </div>
  );
};

export default Header;
