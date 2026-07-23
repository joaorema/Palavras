import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../components/button1";
import { WORDLE_WORDS } from "../data/wordleLevels";
import { supabase } from "../supabaseClient";

function getNextUnlockedLevel(completedLevels: number[], totalLevels: number) {
  const completed = new Set(completedLevels);

  for (let level = 1; level <= totalLevels; level += 1) {
    if (!completed.has(level)) return level;
  }

  return totalLevels;
}

export default function WordleLevelPage() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const levels = Array.from({ length: WORDLE_WORDS.length }, (_, index) => index + 1);
  const nextUnlockedLevel = getNextUnlockedLevel(completedLevels, WORDLE_WORDS.length);

  useEffect(() => {
    async function fetchUserProgress() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login", { replace: true });
          return;
        }

        const { data, error } = await supabase
          .from("player_progress")
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

    fetchUserProgress();
  }, [navigate]);

  const handleLevelClick = (levelNumber: number) => {
    navigate("/wordle", {
      state: { levelNumber },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg2 font-mono">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-bg2 font-mono p-4 md:p-9">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10 tracking-tight drop-shadow-lg text-center">
        Selecao de Nivel
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full max-w-5xl">
        {levels.map((level) => {
          const isDone = completedLevels.includes(level);
          const isUnlocked = isDone || level === nextUnlockedLevel;

          return (
            <button
              key={level}
              onClick={() => isUnlocked && handleLevelClick(level)}
              disabled={!isUnlocked}
              className={`
                group relative w-full flex items-center justify-center h-16 md:h-20 px-4 md:px-8 overflow-hidden border-2 rounded-2xl md:rounded-3xl shadow-lg transition-all duration-300 ease-out active:scale-95
                ${
                  isDone
                    ? "bg-green-500/20 border-green-500 shadow-green-500/10"
                    : isUnlocked
                      ? "bg-white/10 border-white/10 hover:border-green-400 hover:-translate-y-1"
                      : "bg-white/5 border-white/5 opacity-45 cursor-not-allowed"
                }
              `}
            >
              {isUnlocked && (
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-green-500 rounded-full transition-all duration-500 ease-out group-hover:w-96 group-hover:h-96" />
              )}

              {!isUnlocked && (
                <span
                  className="absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-full border border-amber-300/40 bg-black/35 px-2 py-0.5 text-xs text-amber-200 shadow-lg"
                  aria-label="Nivel bloqueado"
                >
                  🔒
                </span>
              )}

              <span
                className={`relative z-10 text-lg md:text-xl font-bold transition-colors flex items-center gap-2 ${
                  isDone
                    ? "text-green-400"
                    : isUnlocked
                      ? "text-gray-200 group-hover:text-white"
                      : "text-gray-500"
                }`}
              >
                Nivel {level}
                {isDone && <span>OK</span>}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 md:mt-12 mb-8">
        <Button1 href="/games" title="Voltar" />
      </div>
    </div>
  );
}
