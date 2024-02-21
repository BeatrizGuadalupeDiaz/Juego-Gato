import React from "react";
import "./App.css";
import PropTypes from 'prop-types';

Square.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool,
  updateBoard: PropTypes.func,
  updateTurn: PropTypes.func,
  index: PropTypes.number
};

const TURNS = {
  PLAYER1: "X",
  PLAYER2: "O",
};

const Square = ({ children, isSelected, updateBoard, updateTurn, index }) => {
  const className = `square ${isSelected ? `is-selected` : ""}`;

  const handleClick = () => {
    if(children) return;
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

  const updateTurn = () =>
    setTurn(turn === TURNS.PLAYER1 ? TURNS.PLAYER2 : TURNS.PLAYER1);

  const updateBoard = (index) => {
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
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
      <section>
        <button
          onClick={() => {
            setBoard(Array(9).fill(null));
            setTurn(TURNS.PLAYER1);
          }}
        >
          Play Again
        </button>
      </section>
      {
        board.includes(null) ? null : <h2>Game Over</h2>
      }
    </main>
  );
}

export default App;
