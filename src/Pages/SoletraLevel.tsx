import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../components/button1";
import { SOLETRA_LEVELS } from "../data/soletraLevels";
import { supabase } from "../supabaseClient";

function getNextUnlockedLevel(completedLevels: number[], totalLevels: number) {
  const completed = new Set(completedLevels);

  for (let level = 1; level <= totalLevels; level += 1) {
    if (!completed.has(level)) return level;
  }

  return totalLevels;
}

export default function SoletraLevelPage() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const levels = Array.from({ length: SOLETRA_LEVELS.length }, (_, index) => index + 1);
  const nextUnlockedLevel = getNextUnlockedLevel(completedLevels, SOLETRA_LEVELS.length);

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
          .from("soletra_progress")
          .select("level_number")
          .eq("user_id", user.id);

        if (error) throw error;

        setCompletedLevels([...new Set((data ?? []).map((item) => item.level_number))].sort((a, b) => a - b));
      } catch (err) {
        console.error("Erro ao carregar progresso do Soletra:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [navigate]);

  const handleLevelClick = (levelNumber: number) => {
    navigate("/soletra", {
      state: { levelNumber },
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
        {levels.map((level) => {
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
                    ? "bg-amber-500/20 border-amber-400 shadow-amber-500/10"
                    : isUnlocked
                      ? "bg-white/10 border-white/10 hover:border-amber-300"
                      : "bg-white/5 border-white/5 opacity-45 cursor-not-allowed"
                }`}
            >
              {!isUnlocked && (
                <span
                  className="absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-full border border-amber-300/40 bg-black/35 px-2 py-0.5 text-xs text-amber-200 shadow-lg"
                  aria-label="Nivel bloqueado"
                >
                  🔒
                </span>
              )}

              <span
                className={`relative z-10 text-lg font-bold flex items-center gap-2 ${
                  isDone ? "text-amber-300" : isUnlocked ? "text-gray-200" : "text-gray-500"
                }`}
              >
                Nivel {level}
                {isDone && <span aria-label="Nivel concluido">✅</span>}
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
