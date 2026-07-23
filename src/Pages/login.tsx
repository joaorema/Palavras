import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { supabase } from "../supabaseClient";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginClick = async () => {
    setError("");
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Email ou password em falta");
      return;
    }

    setLoading(true);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (loginError) throw loginError;

      navigate("/home");
    } catch {
      setError("Credenciais invalidas ou erro de conexao");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="register">
          <h2 className="font-mono">Login</h2>
          {error && (
            <p className="error" style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </p>
          )}
          <form
            className="font-mono"
            onSubmit={(event) => {
              event.preventDefault();
              void loginClick();
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </form>
        </div>

        <button
          type="button"
          onClick={loginClick}
          disabled={loading}
          className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer"
        >
          <span className="relative">{loading ? "A entrar..." : "Login"}</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer"
        >
          <span className="relative">Nova Conta</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
