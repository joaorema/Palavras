import "../css/login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginClick = () => {
    if (!email || !password) {
      setError("Email or Password missing");
      return;
    }
    console.log(email);
    console.log(password);
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
