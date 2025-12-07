import "../css/login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";
import Button2 from "../components/button2";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
  const loginClick = async () => {
    setError("")
    if (!username || !password) {
      setError("Username ou Password em falta");
      return;
    }
    setLoading(true)
    try{
      const data = await api.login(username, password);
      console.log("login worked!");
      alert("Login Worked!");
      navigate("/home")
    }
    catch(err)
    {
      console.log("login failed", err);
      setError("Username ou Password invalido");
    }
    finally{
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
          {error && <p className="error">{error}</p>}
          <form className="font-mono">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <button onClick={loginClick} className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer">
          <span className="relative">Login</span>
        </button>

        <button onClick={registerClick} className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer">
          <span className="relative">Nova Conta</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
