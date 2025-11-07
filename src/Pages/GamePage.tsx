import { Navigate, NavigationType, useNavigate } from "react-router-dom";
import BackBtn from "../components/backBtn";
import "../css/GamePage.css";

function GamePage() {
  const navigate = useNavigate();
  const btn1Click = () => {
    navigate("/palavras");
  };
  const btn2Click = () => {
    navigate("/conexao");
  };
  const backBtnClick = () =>{
    navigate("/home")
  }

  return (
    <>
      <div className="home-container">
        <div className="button-div">
          <button className="btn1" onClick={btn1Click}>Palavras</button>
          <button className="btn2" onClick={btn2Click}>Conexões</button>
        </div>

        <div className="backbtn-div">
          <button className="back-btn" onClick={backBtnClick}>Back</button>
        </div>
      </div>
    </>
  );
}

export default GamePage;
