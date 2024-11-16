import React from 'react';
import TarotCard from "./TarotCard.jsx";

const Tarot = (props) => {
    const { role, name, tarot } = props;

    return (
      <div className="tarot-list-object">
          <h2>Карты таро для {role} {name}</h2>

          <div className="tarot-list-wrapper">
              {tarot.map((item, index) => (
                  <TarotCard key={index} tarot_id={item} />
              ))}
          </div>
      </div>
  );
};

export default Tarot;
