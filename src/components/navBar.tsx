import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(api.isAuthenticated());
  const navigate = useNavigate();
  //check login status
  useEffect(() => {
    // In case localStorage changes externally (e.g. after login)
    const handleStorageChange = () => {
      setIsLoggedIn(api.isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  function capitalizeName(name: string) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  }
  const user = api.getCurrentUser();
 

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        {isLoggedIn  && user ? (
          <Link to="/profile" className="nav-link-2">
            {capitalizeName(user.username)}
          </Link>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
export default NavBar;
