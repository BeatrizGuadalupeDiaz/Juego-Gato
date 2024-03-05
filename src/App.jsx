import React from "react";
import "./App.css";

const TURNS = {
  PLAYER1: "X",
  PLAYER2: "O",
};
const WINNER_COMBINATIONS = [
  [0, 1, 2], // Horizontal
  [3, 4, 5], // Horizontal
  [6, 7, 8], // Horizontal
  [0, 3, 6], // Vertical
  [1, 4, 7], // Vertical
  [2, 5, 8], // Vertical
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

const Square = ({ children, isSelected, updateBoard, updateTurn, index }) => {
  const className = `square ${isSelected ? `is-selected` : ""}`;

  const handleClick = () => {
    //if (children || winner) return;
    updateBoard(index);
    updateTurn();
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [turn, setTurn] = React.useState(TURNS.PLAYER1);
  const [winner, setWinner] = React.useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.PLAYER1);
    setWinner(null);
  }
  const updateTurn = () =>
    setTurn(turn === TURNS.PLAYER1 ? TURNS.PLAYER2 : TURNS.PLAYER1);
  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
    else if(newBoard.every((square) => square !== null)){
      setWinner(false);
    }
  };
  
  return (
    <main className="board">
      <h1>Juego Gato</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              updateTurn={updateTurn}
            >
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.PLAYER1}> {TURNS.PLAYER1}</Square>
        <Square isSelected={turn === TURNS.PLAYER2}> {TURNS.PLAYER2}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>
              {winner === false
                ? "Empate"
                : `Ganador`}
            </h2>
            <header className="win">
              {winner && <Square> {winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
      <section>
        <button
          onClick={() => {
            setBoard(Array(9).fill(null));
            setTurn(TURNS.PLAYER1);
            setWinner(null);
          }}
        >
          Play Again
        </button>
      </section>
    </main>
  );
}

export default App;
