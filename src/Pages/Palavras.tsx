import BackBtn from "../components/backBtn";
import "../css/Home.css";
import { Navigate, useNavigate } from "react-router-dom";


function PalavrasPage() {
  const navigate = useNavigate();
  const backBtnClick = () => {
    navigate("/games");
  };
  const startBtn = () =>{
    navigate("/wordle");
  }
  return (
    <div className="home-container">
      <h1>Palavras Game</h1>
      <button className="start-btn" onClick={startBtn}>Start</button>
      <button className="btn1" onClick={backBtnClick}>Back</button>
    </div>
  );
}

export default PalavrasPage;
