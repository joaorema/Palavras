import { api } from "../api/api";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../css/Profile.css'

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(api.isAuthenticated());
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) 
        navigate("/home");
    else 
        setUser(currentUser);
  }, [navigate]);
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

        {/* Example stats section — adapt to your DB */}
        <div className="profile-stats">
          <h3>Game Stats</h3>
          <p>
            <strong>Total Games:</strong> {currentUser.totalGames || 0}
          </p>
          <p>
            <strong>Wins:</strong> {currentUser.wins || 0}
          </p>
          <p>
            <strong>Best Score:</strong> {currentUser.bestScore || 0}
          </p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
