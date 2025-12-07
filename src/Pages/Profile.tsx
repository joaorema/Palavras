// @ts-nocheck
import { api } from "../api/api";
import { use, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/Profile.css";

const PLACEHOLDERS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Midnight",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bear",
];


function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(api.isAuthenticated());
  const [user, setUser] = useState(null);
  const [gameStats, setGameStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0)
  const [photo, setPhoto] = useState(PLACEHOLDERS[counter]);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) navigate("/home");
    else {
      setUser(currentUser);
      fetchWins();
    }
  }, [navigate]);

  const fetchWins = async () => {
    try {
      setLoading(true);
      const data = await api.getWins();
      setGameStats(data);
    } catch (error) {
      console.error("Failed to fetch wins:", error);
    } finally {
      setLoading(false);
    }
  };
  function capitalizeName(name: string) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  }
  const changePhoto = () =>
  {
    if(photo === PLACEHOLDERS[0])
      setPhoto(PLACEHOLDERS[1]);
    else if(photo == PLACEHOLDERS[1])
      setPhoto(PLACEHOLDERS[2]);
    else if(photo == PLACEHOLDERS[2])
      setPhoto(PLACEHOLDERS[3]);
    else if(photo == PLACEHOLDERS[3])
      setPhoto(PLACEHOLDERS[4]);
    else if(photo == PLACEHOLDERS[4])
      setPhoto(PLACEHOLDERS[5]);
    else if(photo == PLACEHOLDERS[5])
      setPhoto(PLACEHOLDERS[6]);
    else if(photo == PLACEHOLDERS[6])
      setPhoto(PLACEHOLDERS[7]);
    else
      setPhoto(PLACEHOLDERS[0]);
  }
  const currentUser = api.getCurrentUser();
  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    navigate("/login");
    console.log("Logout worked!");
  };

  if (!user) return null;
  return (
    <div className="profile-container font-mono">
      <div className="profile-box">
        <h2>Perfil</h2>
        <div>
         <img className="rounded-t-base" src={photo} alt="" />
          <div className="py-5"></div>
         <button onClick={changePhoto} className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer">
          <span className="relative">Trocar Foto</span>
        </button>
          </div> 
          <div className="py-5">

          </div>
        <div className="profile-info">
          <p>
            <strong>Username:</strong> {currentUser.username}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
        </div>

        {/* Game stats section */}
        <div className="profile-stats">
          <h3>Game Stats</h3>
          {loading ? (
            <p>Loading stats...</p>
          ) : gameStats ? (
            <>
              {gameStats.stats &&
                gameStats.stats.map((stat) => (
                  <div key={stat.game_type} className="game-type-stats">
                    <p>
                      <strong>{capitalizeName(stat.game_type)}:</strong>
                    </p>
                    <ul>
                      <li>Vitorias: {stat.wins}</li>
                    </ul>
                  </div>
                ))}
            </>
          ) : (
            <p>No stats available</p>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
