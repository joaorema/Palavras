import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Certifique-se de importar o client

function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    // 1. Checar sessão atual assim que o componente carrega
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Ouvir mudanças no estado de autenticação (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Limpar o listener quando o componente for destruído
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  function capitalizeName(name) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  }

  // O username que salvamos no registro está em user_metadata
  const displayName = user?.user_metadata?.display_name || user?.email;

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
          <Link to="/login" className="nav-link font-mono" >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
