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
              }}
            >
              {square}
            </button>
          );
        })}
      </section>
    </main>
  );
}

export default App;
