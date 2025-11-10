import "../css/login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
  const loginClick = async () => {
    setError("")
    if (!username || !password) {
      setError("Email or Password missing");
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
      setError("Invalid credentials");
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
          <h2>Login Page</h2>
          {error && <p className="error">{error}</p>}
          <form>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <button type="submit" onClick={loginClick}>
          Login
        </button>
        <button type="submit" onClick={registerClick}>
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
