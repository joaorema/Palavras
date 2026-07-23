import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="navbar">
      <div className="navbar-links" style={{ fontSize: "20px", fontWeight: 700 }}>
        <Link to="/home" className="nav-link">
          Palavras | Conexões
        </Link>

        {user ? (
          <>
            <Link to="/perfil" className="nav-link">
              Perfil
            </Link>
            <Link to="/home" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login" className="nav-link font-mono">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
