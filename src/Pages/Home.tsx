import "../css/Home.css";
import {useNavigate } from "react-router-dom";
import Button1 from "../components/button1";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const btn1Click = () => {
    navigate("/games");
  };

  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    }, []);

  
  return (
    <div className="top-div gap-2.5">
      <h1 className="font-mono">Palavras | Conexões</h1>
      <Button1 href="/games" title="Jogar">
      </Button1>
      {user ? (
        <div className="gap-2.5  flex">
            <Button1 href="/perfil" title="Perfil"></Button1>
            <Button1 href="/logout" title="Logout"></Button1>
        </div>
        ) : (
            <Button1 href="/login" title="Login"></Button1>
        )}
    </div>
  );
}

export default Home;
