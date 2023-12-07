import { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    // create a copy of the current Squares' state
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className={winner ? "status status-winner" : "status"}>{status}</div>
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
    </>
  );
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;        // check if currentMove is even then current move is 'X'
  const currentSquares = history[currentMove];  // currentSquares is the current state of the game, get in 'history' at 'currentMove'

  const handlePlay = (nextSquares) => {
    // handle the nexts up state of the game after a move.
    // change history (or the state of the game) on the current move
    // by slice the history up to the current move + 1 (because slice selecte from 'start' to 'end' ('end' not included))
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);                    // set the history state
    setCurrentMove(nextHistory.length - 1);     // set back the current move base on history state
  };

  // if player move back to previous squares state in history and make a move,
  // 'history' now will get a new squares state
  const jumpToMove = (nextMove) => {
    setCurrentMove(nextMove);
  }

  // TODO: need to check when 'moves' list get re-render !
  // 'move' is the index of 'squares' in 'history'
  const listMoves = history.map((squares, move) => {
    let description;
    if(move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpToMove(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <p className="history-heading">Moves History</p>
        <ol className="history-list">{listMoves}</ol>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
