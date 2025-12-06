import "../css/Home.css";
import {useNavigate } from "react-router-dom";
import Button1 from "../components/button1";

function Home() {
  const navigate = useNavigate();
  const btn1Click = () => {
    navigate("/games");
  };

  return (
    <div className="top-div">
      <h1>Jogos</h1>
      <Button1 href="/games" title="Jogar">
      </Button1>
    </div>
  );
}

export default Home;
