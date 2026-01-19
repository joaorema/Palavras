// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../css/Profile.css";
import Button1 from "../components/button1";

const PLACEHOLDERS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Midnight",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bear",
];

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ wordle: 0, connections: 0 });
  const [loading, setLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // 1. Get current logged in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        navigate("/login");
        return;
      }
      setUser(user);

      // 2. Fetch Wordle Levels completed
      const { count: wordleCount } = await supabase
        .from('player_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // 3. Fetch Connections Levels completed
      const { count: connCount } = await supabase
        .from('connections_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setStats({
        wordle: wordleCount || 0,
        connections: connCount || 0
      });

    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const changePhoto = () => {
    // Rotates through the array using modulo operator (%)
    setPhotoIndex((prevIndex) => (prevIndex + 1) % PLACEHOLDERS.length);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg2 font-mono text-white">
        <div className="animate-pulse text-xl">A carregar perfil...</div>
      </div>
    );
  }

  return (
    <div className="profile-container font-mono">
      <div className="profile-box">
        <h2 className="text-2xl font-bold mb-6">O Teu Perfil</h2>
        
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img 
              className="w-32 h-32 rounded-full border-4 border-green-500 shadow-xl bg-gray-700" 
              src={PLACEHOLDERS[photoIndex]} 
              alt="Avatar" 
            />
          </div>
          
          <button 
            onClick={changePhoto} 
            className="mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm transition-all border border-gray-600"
          >
            Trocar Avatar
          </button>
        </div>

        <div className="profile-info mt-8 space-y-2 text-left w-full px-4">
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-white border-b border-white/10 pb-2">{user?.email}</p>
        </div>

        {/* Improved Stats Section */}
        <div className="profile-stats mt-8 w-full px-4">
          <h3 className="text-lg font-bold text-green-400 mb-4 uppercase tracking-wider">Progresso</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Palavras</p>
              <p className="text-2xl font-bold">{stats.wordle}</p>
              <p className="text-[10px] text-gray-500">Lvls concluídos</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Conexões</p>
              <p className="text-2xl font-bold">{stats.connections}</p>
              <p className="text-[10px] text-gray-500">Lvls concluídos</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full flex flex-col gap-3">
          <Button1 
            className="w-full py-3 text-gray-400 hover:text-white transition-colors" title="Jogos"
            onClick={() => navigate("/games")}
          >
          </Button1>
          <button 
            className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 rounded-xl transition-all font-bold" 
            onClick={handleLogout}
          >
            Logout
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;