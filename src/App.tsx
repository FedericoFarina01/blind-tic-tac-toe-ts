import "./App.css";
import { useState } from "react";

type Values = "X" | "O" | null;

function Square({ value, onSquareClick }) {
  return (
    <button type="button" className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = getWinner(squares);

  if (winner) {
    alert(`El ganador es ${winner}`);
  }

  function handleClick(i: number) {
    if (squares[i]) return;
    const nextSquares = [];
    for (let x = 0; x < squares.length; x++) {
      if (x === i) {
        nextSquares[x] = xIsNext ? "X" : "O";
      } else {
        nextSquares[x] = squares[x];
      }
    }
    setSquares(nextSquares);
    setXisNext(!xIsNext);
  }

  let nextPlayer: string;
  if (xIsNext) {
    nextPlayer = "Juegan las X";
  } else {
    nextPlayer = "Juegan los O";
  }

  return (
    <main>
      <h1>Blind Tic Tac Toe</h1>
      <h2>{nextPlayer}</h2>
      <Board squares={squares} handleClick={handleClick} />
    </main>
  );
}

function Board({ squares, handleClick }) {
  return (
    <div className="board-container">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function getWinner(squares: Values[]) {
  const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
