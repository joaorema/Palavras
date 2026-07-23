import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import { supabase } from "../supabaseClient";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = async () => {
    setError("");
    const trimmedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedUsername || !normalizedEmail || !password) {
      setError("Username, email ou password em falta");
      return;
    }

    if (password.length < 8) {
      setError("A password deve ter pelo menos 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      const { error: signupError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            display_name: trimmedUsername,
          },
        },
      });

      if (signupError) throw signupError;

      navigate("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro no registo";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container font-mono">
      <div className="register-box">
        <div className="register">
          <h2>Nova Conta</h2>
          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleForm();
            }}
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
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
              autoComplete="new-password"
            />
          </form>
        </div>
        <button
          type="button"
          onClick={handleForm}
          disabled={loading}
          className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer"
        >
          <span className="relative">{loading ? "A registar..." : "Criar conta"}</span>
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
