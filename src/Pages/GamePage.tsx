import { useNavigate } from "react-router-dom";
import GameCard from "../components/Card";
import Button1 from "../components/button1";
import "../css/GamePage.css";

const games = [
  {
    title: "Palavras",
    description: "Adivinha a palavra de 5 letras em seis tentativas.",
    meta: "Wordle PT-PT",
    videoSrc: "/palavrasvideo.webm",
    route: "/wordlelevel",
    tone: "wordle",
  },
  {
    title: "Conexões",
    description: "Agrupa palavras que partilham a mesma ligação.",
    meta: "Categorias",
    videoSrc: "/conexoesvideo.webm",
    route: "/connectionlevel",
    tone: "connections",
  },
];

function GamePage() {
  const navigate = useNavigate();

  return (
    <div className="games-page">
      <div className="games-heading">
        <span>Escolhe o desafio</span>
        <h1>Jogos</h1>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <GameCard
            key={game.route}
            title={game.title}
            description={game.description}
            meta={game.meta}
            videoSrc={game.videoSrc}
            tone={game.tone}
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
