import React from "react";
import { ROWS, COLS, CELL, BODY, FOOD } from "./const";

function Cell({ board, handleKey }) {
  const cells = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = COLS * row + col;
      const value = board[key];
      const className =
        value === BODY ? "body-cell" : value === FOOD ? "food-cell" : "cell";
      cells.push(<div key={key} className={className} />);
    }
  }

  return (
    <div
      style={{ width: COLS * CELL, height: ROWS * CELL }}
      tabIndex={0}
      onKeyDown={handleKey}
      className="board"
    >
      {cells}
    </div>
  );
}

export default Cell;
