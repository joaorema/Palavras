import "../css/register.css";
import { useState } from "react";
import { api } from "../api/api";
import { Navigate, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleForm = async () => {
    setError("") //reset 

    if (!username || !email || !password) {
      setError("Username, Email or Password missing");
      return;
    }
    if(password.length < 4)
    {
        setError("Password must have atleast 4 characthers")
        return;
    }
    setLoading(true);
    try{
        const data = await api.register(username,email,password);
        console.log("Registration worked!", data);
        navigate("/home")
    }
    catch(err)
    {
        setError("Registration error");
        console.log("Registration failed", err);
    }
    finally{
        setLoading(false);
    }
  };
  
  const GoogleBtn = () => {
    console.log("coming later!");
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register">
          <h2>Register Page</h2>
          {error && <p className="error-message">{error}</p>}
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
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
        </div>
        <button type="submit" onClick={handleForm}>
          Register
        </button>
        <button type="submit" onClick={GoogleBtn}>
          Google account
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
