import React, { Component } from "react";
import Cell from "./Cell";
import { ROWS, COLS, BODY, FOOD, START, KEYS, DIRS } from "./const";
import "./style.css";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      snake: [],
      direction: null,
      gameOver: false
    };
    this.start = this.start.bind(this);
    this.frame = this.frame.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount() {
    this.start();
  }

  start() {
    const board = [];
    const snake = [START];

    board[START] = BODY;

    this.setState(
      {
        board,
        snake,
        direction: KEYS.right
      },
      () => {
        this.frame();
      }
    );
  }

  end() {
    alert("GAME OVER!");
    this.start();
  }

  frame() {
    const { snake, board } = this.state;
    let { direction } = this.state;
    const head = this.getNextIndex(snake[0], direction);
    const food = board[head] === FOOD || snake.length === 1;

    if (snake.indexOf(head) !== -1) {
      this.setState({ gameOver: true });
      return this.end();
    }

    if (food) {
      const maxCell = ROWS * COLS;
      let i;
      do {
        i = Math.floor(Math.random() * maxCell);
      } while (board[i]);
      board[i] = FOOD;
    } else {
      board[snake.pop()] = null;
    }

    board[head] = BODY;
    snake.unshift(head);

    if (this.nextDirection) {
      direction = this.nextDirection;
      this.nextDirection = null;
    }

    this.setState(
      {
        board,
        snake,
        direction
      },
      () => {
        setTimeout(this.frame, 200);
      }
    );
  }

  handleKey = event => {
    const direction = event.nativeEvent.keyCode;
    const diff = Math.abs(this.state.direction - direction);

    if (DIRS[direction] && diff !== 0 && diff !== 2) {
      this.nextDirection = direction;
    }
  };

  getNextIndex(head, direction) {
    let x = head % COLS;
    let y = Math.floor(head / COLS);

    switch (direction) {
      case KEYS.up:
        y = y <= 0 ? ROWS - 1 : y - 1;
        break;
      case KEYS.down:
        y = y >= ROWS ? 0 : y + 1;
        break;
      case KEYS.left:
        x = x <= 0 ? COLS - 1 : x - 1;
        break;
      case KEYS.right:
        x = x >= COLS - 1 ? 0 : x + 1;
        break;
      default:
        return;
    }
    return COLS * y + x;
  }

  render() {
    const { board } = this.state;
    return (
      <>
        <header className="header">SNAKE GAME</header>
        <Cell board={board} handleKey={this.handleKey} />
      </>
    );
  }
}

export default Game;
