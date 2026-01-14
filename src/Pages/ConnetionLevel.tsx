import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../components/button1";
import { supabase } from "../supabaseClient";
import { levels as connectionsData } from "./conexaolvls";

export default function ConnectionLevelPage() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  // We determine the number of levels based on your conexaolvls array length
  const totalLevels = connectionsData.length;
  const levelsArray = Array.from({ length: totalLevels }, (_, i) => i + 1);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('connections_progress') // Separate table for connections
            .select('level_number')
            .eq('user_id', user.id);

          if (error) throw error;
          setCompletedLevels(data.map(item => item.level_number));
        }
      } catch (err) {
        console.error("Error loading progress:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, []);

  const handleLevelClick = (levelNumber) => {
    // We send the specific level data to the game
    navigate("/conexao", {
      state: {
        levelData: connectionsData[levelNumber - 1],
        levelNumber: levelNumber,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg2 font-mono text-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-bg2 font-mono p-4 md:p-9">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10 text-center">
        Conexões: Níveis
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full max-w-5xl">
        {levelsArray.map((level) => {
          const isDone = completedLevels.includes(level);
          return (
            <button
              key={level}
              onClick={() => handleLevelClick(level)}
              className={`group relative w-full flex items-center justify-center h-16 md:h-20 px-4 border-2 rounded-2xl transition-all duration-300 active:scale-95
                ${isDone 
                  ? "bg-blue-500/20 border-blue-500 shadow-blue-500/10" 
                  : "bg-white/10 border-white/10 hover:border-blue-400"
                }`}
            >
              <span className={`relative z-10 text-lg font-bold flex items-center gap-2
                ${isDone ? "text-blue-400" : "text-gray-200"}`}>
                Nível {level}
                {isDone && <span>✓</span>}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <Button1 href="/games" title="Voltar" />
      </div>
    </div>
  );
}