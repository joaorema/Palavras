import { useNavigate } from "react-router-dom";
import GameCard from "../components/Card";
import Button1 from "../components/button1";
import "../css/GamePage.css";

const games = [
  {
    title: "Palavras",
    videoSrc: "/palavrasvideo.webm",
    route: "/wordlelevel",
  },
  {
    title: "Conexões",
    videoSrc: "/conexoesvideo.webm",
    route: "/connectionlevel",
  },
];

function GamePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="button-div">
        {games.map((game) => (
          <GameCard
            key={game.route}
            title={game.title}
            videoSrc={game.videoSrc}
            onClick={() => navigate(game.route)}
          />
        ))}
      </div>

      <div className="backbtn-div">
        <Button1 href="/home" title="Voltar" />
      </div>
    </div>
  );
}

export default GamePage;
