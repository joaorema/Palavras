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
    <div className="min-h-screen flex flex-col items-center bg-bg2 font-mono p-4 md:p-9">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10 tracking-tight drop-shadow-lg text-center">
        Select Level
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full max-w-5xl">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => handleLevelClick(level)}
            className="
              group
              relative
              w-full
              flex items-center justify-center
              
              /* RESPONSIVE HEIGHT: Shorter on mobile (h-16), Taller on PC (h-20) */
              h-16 md:h-20
              
              px-4 md:px-8
              overflow-hidden
              
              /* GLASSMORPHISM */
              bg-white/10
              backdrop-blur-sm
              border-2 
              border-white/10
              
              /* CORNERS: slightly smaller radius on mobile looks sharper */
              rounded-2xl md:rounded-3xl
              shadow-lg
              
              /* ANIMATIONS */
              transition-all duration-300 ease-out
              hover:border-green-400
              hover:shadow-green-500/20
              hover:scale-[1.02] 
              hover:-translate-y-1
              active:scale-95
            "
          >
            {/* Green Fill Effect */}
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

            {/* Text: Slightly smaller on mobile */}
            <span className="relative z-10 text-lg md:text-xl font-bold text-gray-200 group-hover:text-white transition-colors">
              Level {level}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 md:mt-12 mb-8">
        <Button1 href="/games" title="Voltar" />
      </div>
    </div>
  );
}