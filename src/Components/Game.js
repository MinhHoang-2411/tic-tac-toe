import {useState} from 'react'
import { calculateWinner } from "../helper";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]); //history = [ [null x 9]]
  const [stepNumber, setStepNumber] = useState(0); // stepNumber = 0

  const winner = calculateWinner(history[stepNumber]); // calculateWinner([null x 9])

  const [xIsNext, setXisNext] = useState(true); // xIsNext = true
  const xO = xIsNext ? "X" : "O"; // xO= X

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1); //history.slice(0,1) <=>  [ [null x 9]] - reset History
    const current = historyPoint[stepNumber]; // [null x 9] - phần tử cuối của historyPoint
    const squares = [...current]; //[null x 9] [copy current]

    if (winner || squares[i]) return; // nếu có winner hoặc squares[i] đã có giá trị thì return k chạy vế sau

    squares[i] = xO;// gán giá trị xO cho squares[i] ( lần đầu là x)
    setHistory([...historyPoint, squares]);

    setStepNumber(stepNumber + 1);
    setXisNext(!xIsNext);
  };

  const renderMoves = () =>
    history.map((_step, index) => {
      const destination = index ? `Go to move #${index}` : "Go to Start";
      return (

          <button style={{display:'block'}} key={index} onClick={() =>{
             setStepNumber(index);
             setXisNext(index % 2 === 0);
          }}>{destination}</button>

      );
    });

  return (
    <>
      <h1 style={ {textAlign: 'center'} } >Ca rô</h1>
      {winner && <h2 style={{textAlign:'center', color:'#af0ebd'}} >GGEZ!</h2>}
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? <span style={{color:'#af0ebd'}}> {`Winner: ${winner}`} </span> : `Next player: ${xO}`}</h3>
      </div>
    </>
  );
};

export default Game;