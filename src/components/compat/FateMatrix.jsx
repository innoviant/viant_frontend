import React from 'react';
import FateCell from "./FateCell";

const FateMatrix = (props) => {
    const { role, name, fate } = props;

  return (
      <div className="fate-matrix-wrapper">
          <div className="pyth-matrix">
              {fate.map((item, index) => (
                  <FateCell key={index} cell_value={index + 1} cell_repeat={item}/>
              ))}
          </div>

          <p>Матрица для {role} {name}</p>
      </div>
  );
};

export default FateMatrix;
