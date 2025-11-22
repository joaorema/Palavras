import { Navigate, NavigationType, useNavigate } from "react-router-dom";
import "../css/GamePage.css";
import GameCard from "../components/Card";

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
  const Games = [
    {
      title: "Palavras",
      videoSrc: "../../public/palavrasvideo.webm",
      //imageSrc: "../../public/PalavrasPhoto.png",
      onClick: () => navigate("/wordle"),
    },
    {
      title: "Conexões",
      videoSrc: "../../public/conexoesvideo.webm",
      //imageSrc: "../../public/incoming.png",
      onClick: () => navigate("/conexao"),
    },
  ];

  return (
    <>
      <div className="home-container">
        <div className="button-div">
          {Games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
        </div>

        <div className="backbtn-div">
          <button className="back-btn" onClick={backBtnClick}>Voltar</button>
        </div>
      </div>
    </>
  );
}

export default GamePage;
