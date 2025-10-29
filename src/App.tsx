import { useState } from "react";
import "./App.css";

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

type Move = "X" | "O";
type Square = null | Move;
function App() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [prevMove, setPrevMove] = useState<Move>("O");
  const [winner, setWinner] = useState<null | Move>(null);
  return (
    <main>
      <section className="board">
        {squares.map((square, index) => {
          const id = `square-${index}`;
          return (
            <button
              className="cell"
              key={id}
              type="button"
              onClick={() => {
                const nextSquares = squares.map((square, _index) => {
                  if (index === _index) {
                    const nextMove = prevMove === "X" ? "O" : "X";
                    setPrevMove(nextMove);
                    return nextMove;
                  }
                  return square;
                });
                setSquares(nextSquares);
                const winner = getWinner(nextSquares);
                if (winner) {
                  setWinner(winner);
                }
              }}
            >
              {square}
            </button>
          );
        })}
      </section>
      <section>{winner ? <span>The winner is {winner}</span> : null}</section>
    </main>
  );
}

function getWinner(squares: Square[]) {
  for (const winningLine of WINNING_LINES) {
    const first = squares[winningLine[0]];
    const second = squares[winningLine[1]];
    const third = squares[winningLine[2]];
    if ((first || second || third) === null) {
      return null;
    }
    if (first === second && second === third && first === third) {
      return first; // either second or third is OK as well
    }
  }
}

export default App;
