import React from 'react';

import one from "./../../images/tarot/1.png"
import two from "./../../images/tarot/2.png";
import three from "./../../images/tarot/3.png";
import four from "./../../images/tarot/4.png";
import five from "./../../images/tarot/5.png";
import six from "./../../images/tarot/6.png";
import seven from "./../../images/tarot/7.png";
import eight from "./../../images/tarot/8.png";
import nine from "./../../images/tarot/9.png";
import ten from "./../../images/tarot/10.png";
import eleven from "./../../images/tarot/11.png";
import twelve from "./../../images/tarot/12.png";
import thirteen from "./../../images/tarot/13.png";
import fourteen from "./../../images/tarot/14.png";
import fifteen from "./../../images/tarot/15.png";
import sixteen from "./../../images/tarot/16.png";
import seventeen from "./../../images/tarot/17.png";
import eighteen from "./../../images/tarot/18.png";
import nineteen from "./../../images/tarot/19.png";
import twenty from "./../../images/tarot/20.png";
import twentyOne from "./../../images/tarot/21.png";

import {tarot_map} from "../../__data__/Tarot_map";

const TarotCard = (props) => {
    const { tarot_id } = props;

    const tarot_image = {
        1: one,
        2: two,
        3: three,
        4: four,
        5: five,
        6: six,
        7: seven,
        8: eight,
        9: nine,
        10: ten,
        11: eleven,
        12: twelve,
        13: thirteen,
        14: fourteen,
        15: fifteen,
        16: sixteen,
        17: seventeen,
        18: eighteen,
        19: nineteen,
        20: twenty,
        21: twentyOne,
    };

  return (
      <div className="tarot-card-wrapper">
          <div className="tarot-img-wrapper">
              <img src={tarot_image[tarot_id]} className="tarot-card" alt="tarot"/>
          </div>

          <p>{tarot_map[tarot_id].ru}</p>
      </div>
  );
};

export default TarotCard;
