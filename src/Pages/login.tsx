import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient"; // Importe o cliente do supabase

function LoginPage() {
  const [email, setEmail] = useState(""); // Alterado de username para email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const loginClick = async () => {
    setError("");
    
    if (!email || !password) {
      setError("Email ou Password em falta");
      return;
    }

    setLoading(true);
    try {
      // Autenticação com Supabase
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (loginError) throw loginError;

      console.log("Login worked!", data);
      navigate("/home");
    }
    catch(err) {
      console.error("Login failed", err);
      setError("Credenciais inválidas ou erro de conexão");
    }
    finally {
      setLoading(false);
    }
  };

  const registerClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="register">
          <h2 className="font-mono">Login</h2>
          {error && <p className="error" style={{color: 'red', marginBottom: '10px'}}>{error}</p>}
          <form className="font-mono" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email" // Alterado para email
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        
        <button 
          onClick={loginClick} 
          disabled={loading}
          className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer"
        >
          <span className="relative">{loading ? "Entrando..." : "Login"}</span>
        </button>

        <button 
          onClick={registerClick} 
          className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer"
        >
          <span className="relative">Nova Conta</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
