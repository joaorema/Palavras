import BackBtn from "../components/backBtn";
import "../css/Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/Buttons.css";

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
      <button className="start-btn" onClick={startBtn}>Comecar</button>
      <button className="backbtn" onClick={backBtnClick}>Voltar</button>
    </div>
  );
}

export default PalavrasPage;
