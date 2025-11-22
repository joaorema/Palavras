import { api } from "../api/api";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/Profile.css";

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(api.isAuthenticated());
  const [user, setUser] = useState(null);
  const [gameStats, setGameStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  const currentUser = api.getCurrentUser();
  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    navigate("/login");
    console.log("Logout worked!");
  };

  if (!user) return null;
  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Profile</h2>
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
              <p>
                <strong>Total Wins:</strong> {gameStats.totalWins || 0}
              </p>
              {gameStats.stats &&
                gameStats.stats.map((stat) => (
                  <div key={stat.game_type} className="game-type-stats">
                    <p>
                      <strong>{capitalizeName(stat.game_type)}:</strong>
                    </p>
                    <ul>
                      <li>Wins: {stat.wins}</li>
                      <li>Losses: {stat.losses}</li>
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
