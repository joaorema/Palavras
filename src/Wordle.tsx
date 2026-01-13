// @ts-nocheck
import { useState, useEffect } from "react";
import "./css/wordle.css";
import { api } from "./api/api";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Button1 from "./components/button1";
import Button2 from "./components/button2";
import { supabase } from "./supabaseClient";



const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["⌫", "Z", "X", "C", "V", "B", "N", "M", "ENTER"],
];

function WordleGame() {
  const location = useLocation();
  const navigate = useNavigate();

  const [targetword, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentguess, setCurrentGuess] = useState("");
  const [currentrow, setCurrentRow] = useState(0);
  const [gameover, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [letterstatus, setLetterStatus] = useState({});
  const [showInstructions, setShowInstructions] = useState(true);

 
  useEffect(() => {
    let newWord = "";

    if (location.state && location.state.targetWord) {
      newWord = location.state.targetWord;
      console.log("Playing Level Word:", newWord);
    } else {
      console.error("failed to load level(word)");
      return;
    }

   
    setTargetWord(newWord);
    setGuesses(Array(6).fill("")); 
    setCurrentGuess(""); 
    setCurrentRow(0); 
    setGameOver(false); 
    setWon(false); 
    setLetterStatus({}); 

  }, [location.state]);

 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showInstructions) return;
      if (gameover) return;
      if (e.key === "Enter") handleSubmit();
      else if (e.key === "Backspace") handleDelete();
      else if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentguess, gameover, targetword, showInstructions]);

  const handleKeyPress = (letter) => {
    if (currentguess.length < WORD_LENGTH) {
      setCurrentGuess(currentguess + letter);
    }
  };

  const handleDelete = () => {
    setCurrentGuess(currentguess.slice(0, -1));
  };

  const handleSubmit = async () => {
  if (currentguess.length !== WORD_LENGTH) {
    alert("Palavra incompleta!");
    return;
  }

  const newGuess = [...guesses];
  newGuess[currentrow] = currentguess;
  setGuesses(newGuess);

  updateLetterStatus(currentguess);

  // --- LÓGICA DE VITÓRIA ---
  if (currentguess === targetword) {
    setWon(true);
    setGameOver(true);

    // 1. Pegar o usuário logado
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const levelNum = location.state?.levelNumber;

      if (levelNum) {
        try {
          // 2. Salvar na tabela player_progress
          const { error } = await supabase
            .from('player_progress')
            .upsert({ 
              user_id: user.id, 
              level_number: levelNum 
            }, { 
              onConflict: 'user_id, level_number' // Evita duplicatas
            });

          if (error) throw error;
          console.log(`Nível ${levelNum} registrado com sucesso!`);
        } catch (err) {
          console.error("Erro ao salvar progresso:", err.message);
        }
      }
    }
    setTimeout(() => {
      alert("Parabéns! Você ganhou! 🏆");
    }, 500);
    return;
  
    }
    if (currentrow === 5) {
      setGameOver(true);
      setTimeout(() => {
        alert(`Fim de jogo! A palavra era: ${targetword}`);
      }, 500);
      return;
    }
    setCurrentRow(currentrow + 1);
    setCurrentGuess("");
  };

  const updateLetterStatus = (guess) => {
    const newStatus = { ...letterstatus };
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (targetword[i] === letter) {
        newStatus[letter] = "correct";
      } else if (
        targetword.includes(letter) &&
        newStatus[letter] !== "correct"
      ) {
        newStatus[letter] = "present";
      } else if (!newStatus[letter]) {
        newStatus[letter] = "absent";
      }
    }
    setLetterStatus(newStatus);
  };

  const getCellStatus = (rowIndex, colIndex) => {
    const guess = guesses[rowIndex];
    if (!guess || guess.length <= colIndex) 
      return "";
    if (rowIndex > currentrow) 
      return "";
    if (rowIndex === currentrow && !gameover) 
      return "";

    const letter = guess[colIndex];
    if (targetword[colIndex] === letter) 
      return "correct";
    else if (targetword.includes(letter)) 
      return "present";
    else 
      return "absent";
  };

  return (
    <div className="wordle-container relative">
      {/* Level Indicator */}
      {location.state?.levelNumber && (
        <div className="absolute top-4 left-4 text-white font-mono text-sm opacity-50">
          Level {location.state.levelNumber}
        </div>
      )}

      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-xl border border-gray-700 bg-[#121213] p-6 text-white shadow-2xl">
            <h2 className="mb-4 border-b border-gray-700 pb-2 text-xl font-bold text-center font-mono">
              Instruções
            </h2>
            <p className="mb-4 text-sm text-gray-300 text-center font-mono">
              Adivinha a palavra em 6 tentativas
            </p>
            <ul className="font-mono space-y-3">
              <li className="flex items-center gap-3">
                <div className=" flex h-10 w-10 items-center justify-center bg-[#538d4e] text-lg font-bold text-white border border-gray-600">
                  P
                </div>
                <span className="text-sm font-mono">
                  Letra <span className="font-bold">certa</span> no lugar certo.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#b59f3b] text-lg font-bold text-white border border-gray-600">
                  L
                </div>
                <span className="text-sm">
                  Letra <span className="font-bold">certa</span> no lugar
                  errado.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#3a3a3c] text-lg font-bold text-white border border-gray-600">
                  A
                </div>
                <span className="text-sm">
                  Letra <span className="font-bold">não existe</span> na
                  palavra.
                </span>
              </li>
            </ul>
            <div className="mt-6 flex justify-center">
              <Button2
                title="Começar"
                onClick={() => setShowInstructions(false)}
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowInstructions(true)}
        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 text-gray-300 transition hover:bg-gray-800 hover:text-white"
        title="Ver instruções"
      >
        ?
      </button>

      <div>
        <h1 className="font-mono font-bold text-[20px]">Palavras</h1>
      </div>

      <div className="wordle-grid font-mono">
        {guesses.map((guess, rowIndex) => (
          <div key={rowIndex} className="wordle-row">
            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
              let letter = "";
              if (rowIndex === currentrow) {
                letter = currentguess[colIndex] || "";
              } else if (rowIndex < currentrow) {
                letter = guess[colIndex] || "";
              }

              const status = getCellStatus(rowIndex, colIndex);

              return (
                <div
                  key={colIndex}
                  className={`wordle-cell ${status} ${letter ? "filled" : ""}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="wordle-keyboard font-mono">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => {
              const status = letterstatus[key] || "";
              const isSpecial = key === "ENTER" || key === "⌫";

              return (
                <button
                  key={key}
                  className={`keyboard-key ${status} ${
                    isSpecial ? "special-key" : ""
                  }`}
                  onClick={() => {
                    if (gameover) return;
                    if (key === "ENTER") handleSubmit();
                    else if (key === "⌫") handleDelete();
                    else handleKeyPress(key);
                  }}
                  disabled={gameover}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
        <div
          style={{
            maxHeight: "600px",
            padding: "20px",
            alignItems: "center",
            display: "flex",
            marginBottom: "20px",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Button1 href="/wordlelevel" title="Voltar"></Button1>
        </div>
      </div>

      {gameover && (
        <div className="game-status">
          {won ? " Ganhaste!" : `A palavra era: ${targetword}`}
        </div>
      )}
    </div>
  );
}

export default WordleGame;
