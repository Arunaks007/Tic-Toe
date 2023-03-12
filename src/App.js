import { useState } from "react";
import "./App.css";

let clickCount = 0;
let winner = false;

function App() {
  const [player, setPlayer] = useState(true);
  const [scores, setScores] = useState([[], [], []]);

  function clicked(event) {
    if (event.target.innerText === "" && !winner) {
      player ? (event.target.innerText = "X") : (event.target.innerText = "O");
      addScores(
        event.target.getAttribute("tag"),
        event.target.getAttribute("parent")
      );
      setPlayer(!player);
    } else {
      alert("please select empty slot");
    }
  }

  function addScores(tag, parent) {
    const newGrid = [...scores];
    newGrid[parent - 1][tag - 1] = player ? "X" : "O";
    setScores(newGrid);
    validateWin();
  }

  function validateWin() {
    let val = player ? "X" : "O";
    if (
      (scores[0][0] === val && scores[0][1] === val && scores[0][2] === val) ||
      (scores[1][0] === val && scores[1][1] === val && scores[1][2] === val) ||
      (scores[2][0] === val && scores[2][1] === val && scores[2][2] === val) ||
      (scores[0][0] === val && scores[1][0] === val && scores[2][0] === val) ||
      (scores[0][1] === val && scores[1][1] === val && scores[2][1] === val) ||
      (scores[0][2] === val && scores[1][2] === val && scores[2][2] === val) ||
      (scores[0][0] === val && scores[1][1] === val && scores[2][2] === val) ||
      (scores[0][2] === val && scores[1][1] === val && scores[2][0] === val)
    ) {
      winner = !winner;
    } else if (++clickCount === 9) {
      alert("Game is Draw");
      resetGame();
    }
    console.log(clickCount);
  }

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="App">
        <div className="row">
          <button tag="1" parent="1" onClick={clicked}></button>
          <button tag="2" parent="1" onClick={clicked}></button>
          <button tag="3" parent="1" onClick={clicked}></button>
        </div>
        <div className="row">
          <button tag="1" parent="2" onClick={clicked}></button>
          <button tag="2" parent="2" onClick={clicked}></button>
          <button tag="3" parent="2" onClick={clicked}></button>
        </div>
        <div className="row">
          <button tag="1" parent="3" onClick={clicked}></button>
          <button tag="2" parent="3" onClick={clicked}></button>
          <button tag="3" parent="3" onClick={clicked}></button>
        </div>
      </div>
      <div className="result">
        {!winner ? (
          <h1 style={{ textAlign: "center", color: "black" }}>
            Player {player ? "X" : "O"}
          </h1>
        ) : (
          <h1 style={{ textAlign: "center", color: "black" }}>
            Player{!player ? " X " : " O "}Wins the Game!!!
          </h1>
        )}
        {winner && (
          <button onClick={resetGame} className="reset">
            Reset the Game
          </button>
        )}
      </div>
    </>
  );
}

export default App;
