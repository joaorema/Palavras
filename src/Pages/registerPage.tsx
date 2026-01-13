import "../css/register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Importe o cliente que criamos no passo anterior
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

    // Validações básicas
    if (!username || !email || !password) {
      setError("Username, Email or Password missing");
      return;
    }
    if (password.length < 6) { // Supabase exige no mínimo 6 caracteres por padrão
      setError("Password must have at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Chamada oficial do Supabase Auth
      const { data, error: signupError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: username,
          },
        },
      });

      if (signupError) 
        throw signupError;
      //alert("Check your email for confirmation link!");
      navigate("/login"); 

    } catch (err) {
      setError(err.message || "Registration error");
      console.error("Registration failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container font-mono">
      <div className="register-box">
        <div className="register">
          <h2>Register Page</h2>
          {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email" 
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
          onClick={handleForm} 
          disabled={loading}
          className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer"
        >
          <span className="relative">{loading ? "Registering..." : "Register"}</span>
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;