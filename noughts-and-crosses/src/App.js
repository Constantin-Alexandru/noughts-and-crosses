import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [scores, setScores] = useState(Array(2).fill(0));
  const [nextStart, setNextStart] = useState("O");

  const checkWin = (cells) => {
    const winStates = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    let found = false;

    for (let orientation in winStates) {
      winStates[orientation].forEach((pattern) => {
        if (
          cells[pattern[0]] === cells[pattern[1]] &&
          cells[pattern[1]] === cells[pattern[2]] &&
          cells[pattern[2]] !== ""
        ) {
          setWinner(turn);
          found = true;
        }
      });
    }

    if (found) return 2;

    for (let i = 0; i < 9; i++) {
      if (cells[i] === "") return 0;
    }

    setWinner("nobody! It's a draw!");
    return 1;
  };

  const handleClick = (ind) => {
    if (cells[ind] !== "" || winner) return;

    let cellsCpy = [...cells];

    cellsCpy[ind] = turn;
    setCells(cellsCpy);
    if (checkWin(cellsCpy) === 2) {
      let scoresCpy = [...scores];
      if (turn === "X") {
        scoresCpy[0]++;
      } else if (turn === "O") {
        scoresCpy[1]++;
      }
      setScores(scoresCpy);
    }

    turn === "X" ? setTurn("O") : setTurn("X");
  };

  const handleRestart = () => {
    setTurn(nextStart);
    setNextStart(nextStart === "X" ? "O" : "X");
    setWinner("");
    setCells(Array(9).fill(""));
  };

  const handleReset = () => {
    setScores(Array(2).fill(0));
    handleRestart();
    setTurn("X");
    setNextStart("O");
  };

  const Cell = ({ ind }) => {
    return (
      <td
        className={
          cells[ind] === "X" ? "x-colour" : cells[ind] === "O" ? "o-colour" : ""
        }
        onClick={() => handleClick(ind)}
      >
        {" "}
        {cells[ind]}{" "}
      </td>
    );
  };

  return (
    <div className="container">
      <h1 className="title">
        <div>NOUGHTS</div>
        <div>AND</div>
        <div>CROSSES</div>
      </h1>

      <div className="scores">
        <div
          className={
            turn === "X" ? "x-underline score-section" : "score-section"
          }
        >
          <b className="xScoreTitle scoreTitle">X</b> -
          <div className="xScore score">{scores[0]}</div>
        </div>
        :
        <div
          className={
            turn === "O" ? "o-underline score-section" : "score-section"
          }
        >
          <div className="oScore score">{scores[1]}</div> -
          <b className="oScoreTitle scoreTitle">O</b>
        </div>
      </div>

      <div>
        <table>
          <tr>
            <Cell ind={0} />
            <Cell ind={1} />
            <Cell ind={2} />
          </tr>
          <tr>
            <Cell ind={3} />
            <Cell ind={4} />
            <Cell ind={5} />
          </tr>
          <tr>
            <Cell ind={6} />
            <Cell ind={7} />
            <Cell ind={8} />
          </tr>
        </table>
      </div>
      <div className={winner ? "win-state" : "win-state hidden"}>
        <p className="win-msg">The winner is {winner}</p>
        <button
          className="win-restart"
          onClick={() => {
            handleRestart();
          }}
        >
          Start a new game!
        </button>
      </div>
      <button
        className="reset"
        onClick={() => {
          handleReset();
        }}
      >
        Reset the game!
      </button>
    </div>
  );
};

export default App;
