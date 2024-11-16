import React from 'react';

const FateCell = (props) => {
    const { cell_value, cell_repeat } = props;

    let display_cell = 0;
    for (let i = 0; i < cell_repeat; i++) {
        display_cell *= 10;
        display_cell += cell_value;
    }

  return (
      <div className="fate-cell">{display_cell}</div>
  );
};

export default FateCell;
