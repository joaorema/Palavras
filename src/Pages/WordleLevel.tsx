import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../components/button1";
import { supabase } from "../supabaseClient"; // Certifique-se de importar o client

const WORDS_LIST = [
  "FORTE", "PRATO", "LIVRO", "CARRO", "PRAIA", "TRELA", "MIUDA", "BROAS", "CHITA", "SOGRO",
  "FINTA", "BRUXA", "CANJA", "BANHO", "ROLHA", "NINHO", "MANTA", "GAITA", "XISTO", "MALTA",
  "VENTO", "CHUVA", "NOITE", "TARDE", "PEDRA", "TERRA", "FLORE", "SERRA", "MONTE", "LAGOA",
];

export default function WordleLevelPage() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([]); // Array de números [1, 5, 8]
  const [loading, setLoading] = useState(true);

  const levels = Array.from({ length: 30 }, (_, i) => i + 1);

  // Buscar progresso do banco de dados
  useEffect(() => {
    async function fetchUserProgress() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('player_progress')
            .select('level_number')
            .eq('user_id', user.id);

          if (error) throw error;

          // Transformar [{level_number: 1}, {level_number: 2}] em [1, 2]
          const done = data.map(item => item.level_number);
          setCompletedLevels(done);
        }
      } catch (err) {
        console.error("Erro ao carregar progresso:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProgress();
  }, []);

  const handleLevelClick = (levelNumber) => {
    const selectedWord = WORDS_LIST[(levelNumber - 1) % WORDS_LIST.length];
    navigate("/wordle", {
      state: {
        targetWord: selectedWord,
        levelNumber: levelNumber,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-bg2 font-mono p-4 md:p-9">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10 tracking-tight drop-shadow-lg text-center">
        Select Level
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full max-w-5xl">
        {levels.map((level) => {
          const isDone = completedLevels.includes(level); // Verifica se o nível está no array

          return (
            <button
              key={level}
              onClick={() => handleLevelClick(level)}
              className={`
                group relative w-full flex items-center justify-center h-16 md:h-20 px-4 md:px-8 overflow-hidden backdrop-blur-sm border-2 rounded-2xl md:rounded-3xl shadow-lg transition-all duration-300 ease-out active:scale-95
                ${isDone 
                  ? "bg-green-500/20 border-green-500 shadow-green-500/10" 
                  : "bg-white/10 border-white/10 hover:border-green-400 hover:-translate-y-1"
                }
              `}
            >
              {/* Efeito de preenchimento ao passar o mouse */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-green-500 rounded-full transition-all duration-500 ease-out group-hover:w-96 group-hover:h-96"></span>

              <span className={`relative z-10 text-lg md:text-xl font-bold transition-colors flex items-center gap-2
                ${isDone ? "text-green-400" : "text-gray-200 group-hover:text-white"}`}
              >
                Level {level}
                {isDone && <span>✓</span>} 
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
