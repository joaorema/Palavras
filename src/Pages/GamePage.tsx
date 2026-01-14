import { Navigate, NavigationType, useNavigate } from "react-router-dom";
import "../css/GamePage.css";
import GameCard from "../components/Card";
import Button1 from "../components/button1";

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
      videoSrc: "/palavrasvideo.webm",
      //imageSrc: "../../public/PalavrasPhoto.png",
      onClick: () => navigate("/wordlelevel"),
    },
    {
      title: "Conexões",
      videoSrc: "/conexoesvideo.webm",
      //imageSrc: "../../public/incoming.png",
      onClick: () => navigate("/connectionlevel"),
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
          <Button1 href="/home" title="Voltar" ></Button1> 
        </div>
      </div>
    </>
  );
}

export default GamePage;
