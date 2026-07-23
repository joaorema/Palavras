import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../components/button1";
import { supabase } from "../supabaseClient";
import { levels as connectionsData } from "./conexaolvls";

function getNextUnlockedLevel(completedLevels: number[], totalLevels: number) {
  const completed = new Set(completedLevels);

  for (let level = 1; level <= totalLevels; level += 1) {
    if (!completed.has(level)) return level;
  }

  return totalLevels;
}

export default function ConnectionLevelPage() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const levelsArray = Array.from({ length: connectionsData.length }, (_, index) => index + 1);
  const nextUnlockedLevel = getNextUnlockedLevel(completedLevels, connectionsData.length);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login", { replace: true });
          return;
        }

        const { data, error } = await supabase
          .from("connections_progress")
          .select("level_number")
          .eq("user_id", user.id);

        if (error) throw error;

        setCompletedLevels([...new Set(data.map((item) => item.level_number))].sort((a, b) => a - b));
      } catch (err) {
        console.error("Erro ao carregar progresso:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [navigate]);

  const handleLevelClick = (levelNumber: number) => {
    navigate("/conexao", {
      state: {
        levelData: connectionsData[levelNumber - 1],
        levelNumber,
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
        Selecao de Nivel
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full max-w-5xl">
        {levelsArray.map((level) => {
          const isDone = completedLevels.includes(level);
          const isUnlocked = isDone || level === nextUnlockedLevel;

          return (
            <button
              key={level}
              onClick={() => isUnlocked && handleLevelClick(level)}
              disabled={!isUnlocked}
              className={`group relative w-full flex items-center justify-center h-16 md:h-20 px-4 border-2 rounded-2xl transition-all duration-300 active:scale-95
                ${
                  isDone
                    ? "bg-blue-500/20 border-blue-500 shadow-blue-500/10"
                    : isUnlocked
                      ? "bg-white/10 border-white/10 hover:border-blue-400"
                      : "bg-white/5 border-white/5 opacity-45 cursor-not-allowed"
                }`}
            >
              <span
                className={`relative z-10 text-lg font-bold flex items-center gap-2 ${
                  isDone ? "text-blue-400" : isUnlocked ? "text-gray-200" : "text-gray-500"
                }`}
              >
                Nivel {level}
                {isDone && <span>OK</span>}
                {!isUnlocked && <span>Bloq.</span>}
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
