import { useEffect, useState } from "react";
import Button1 from "../components/button1";
import "../css/Home.css";
import { supabase } from "../supabaseClient";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="top-div gap-2.5">
      <h1 className="font-mono">Palavras | Conexões</h1>
      <Button1 href="/games" title="Jogar" />
      {user ? (
        <div className="gap-2.5 flex">
          <Button1 href="/perfil" title="Perfil" />
          <Button1 title="Logout" onClick={handleLogout} />
        </div>
      ) : (
        <Button1 href="/login" title="Login" />
      )}
    </div>
  );
}

export default Home;
