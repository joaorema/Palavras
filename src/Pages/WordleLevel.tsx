import React from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../components/button1";

const WORDS_LIST = [
  "FORTE", "PRATO", "LIVRO", "CARRO", "PRAIA", "TRELA", "MIUDA", "BROAS", "CHITA", "SOGRO",
  "FINTA", "BRUXA", "CANJA", "BANHO", "ROLHA", "NINHO", "MANTA", "GAITA", "XISTO", "MALTA",
  "VENTO", "CHUVA", "NOITE", "TARDE", "PEDRA", "TERRA", "FLORE", "SERRA", "MONTE", "LAGOA",
];

export default function WordleLevelPage() {
  const navigate = useNavigate();
  const levels = Array.from({ length: 15 }, (_, i) => i + 1);

  const handleLevelClick = (levelNumber: number) => {
    const selectedWord = WORDS_LIST[(levelNumber - 1) % WORDS_LIST.length];
    navigate("/wordle", {
      state: {
        targetWord: selectedWord,
        levelNumber: levelNumber,
      },
    });
  };

  return (
    <div className="min-h-screen p-9 flex flex-col items-center bg-bg2 font-mono">
      <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight drop-shadow-lg">
        Select Level
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-5xl">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => handleLevelClick(level)}
            className="
              group
              relative
              h-20
              w-full
              flex items-center justify-center /* Centered text looks better with this effect */
              px-8
              overflow-hidden /* Vital: Keeps the green circle inside the button */
              
              /* GLASSMORPHISM STYLES */
              bg-white/10
              backdrop-blur-sm
              border-2 
              border-white/10
              
              rounded-lg
              shadow-lg
              
              /* HOVER & TRANSITIONS */
              transition-all duration-300 ease-out
              hover:border-green-400
              hover:shadow-green-500/20
              hover:scale-[1.02] 
              hover:-translate-y-1
              active:scale-95
            "
          >
          
            <span className="
              absolute 
              top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 
              w-0 h-0 
              bg-green-500 
              rounded-full 
              transition-all duration-500 ease-out 
              group-hover:w-96 group-hover:h-96
            "></span>

          
            <span className="relative z-10 text-xl font-bold text-gray-200 group-hover:text-white transition-colors">
              Level {level}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-12">
        <Button1 href="/games" title="Voltar" />
      </div>
    </div>
  );
}