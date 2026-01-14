// @ts-nocheck
import { useState, useEffect } from "react";
import "./css/wordle.css";
import { useNavigate, useLocation } from "react-router-dom";
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

  // 1. Inicializar o Jogo com a palavra do nível
  useEffect(() => {
    let newWord = "";
    if (location.state && location.state.targetWord) {
      newWord = location.state.targetWord.toUpperCase();
      setTargetWord(newWord);
    } else {
      console.error("Falha ao carregar o nível");
      navigate("/wordlelevel"); // Redireciona se não houver dados
    }
  }, [location.state, navigate]);

  // 2. Escuta de Teclado Real
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showInstructions || gameover) return;
      if (e.key === "Enter") handleSubmit();
      else if (e.key === "Backspace") handleDelete();
      else if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentguess, gameover, showInstructions]);

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

    if (currentguess === targetword) {
      setWon(true);
      setGameOver(true);
      await saveProgress();
    } else if (currentrow === 5) {
      setGameOver(true);
    } else {
      setCurrentRow(currentrow + 1);
      setCurrentGuess("");
    }
  };

  const saveProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const levelNum = location.state?.levelNumber;

    if (user && levelNum) {
      try {
        await supabase.from('player_progress').upsert({ 
          user_id: user.id, 
          level_number: levelNum 
        }, { onConflict: 'user_id, level_number' });
      } catch (err) {
        console.error("Erro ao salvar progresso:", err.message);
      }
    }
  };

  const updateLetterStatus = (guess) => {
    const newStatus = { ...letterstatus };
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (targetword[i] === letter) {
        newStatus[letter] = "correct";
      } else if (targetword.includes(letter) && newStatus[letter] !== "correct") {
        newStatus[letter] = "present";
      } else if (!newStatus[letter]) {
        newStatus[letter] = "absent";
      }
    }
    setLetterStatus(newStatus);
  };

  const getCellStatus = (rowIndex, colIndex) => {
    const guess = guesses[rowIndex];
    if (!guess || rowIndex > currentrow || (rowIndex === currentrow && !gameover)) return "";
    
    const letter = guess[colIndex];
    if (targetword[colIndex] === letter) return "correct";
    if (targetword.includes(letter)) return "present";
    return "absent";
  };

  return (
    <div className="wordle-container relative">
      {/* Indicador de Nível */}
      {location.state?.levelNumber && (
        <div className="absolute top-4 left-4 text-white/40 font-mono text-xs">
          Nível {location.state.levelNumber}
        </div>
      )}

      {/* Botão de Instruções (?) */}
      <button
        onClick={() => setShowInstructions(true)}
        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 text-gray-300"
      >
        ?
      </button>

      {/* Modal de Instruções */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-700 bg-[#121213] p-6 text-white shadow-2xl">
            <h2 className="text-center mb-4 border-b border-gray-700 pb-2 text-xl font-bold font-mono">Instruções</h2>
            <p className="mb-4 text-center text-sm text-gray-300 font-mono">Adivinha a palavra em 6 tentativas.</p>
            <div className="flex justify-center">
              <Button2 title="Começar" onClick={() => setShowInstructions(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="game-header-container">
        <h1 className="font-mono font-bold text-[24px] text-white">Palavras</h1>
      </div>

      {/* Grelha do Jogo */}
      <div className="wordle-grid font-mono">
        {guesses.map((guess, rowIndex) => (
          <div key={rowIndex} className="wordle-row">
            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
              let letter = rowIndex === currentrow ? currentguess[colIndex] : guess[colIndex];
              const status = getCellStatus(rowIndex, colIndex);
              return (
                <div key={colIndex} className={`wordle-cell ${status} ${letter ? "filled" : ""}`}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Teclado Virtual */}
      <div className="wordle-keyboard font-mono mt-4">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => {
              const status = letterstatus[key] || "";
              return (
                <button
                  key={key}
                  className={`keyboard-key ${status} ${key.length > 1 ? "special-key" : ""}`}
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
      </div>

      {/* Interface de Fim de Jogo */}
      {gameover ? (
        <div className="mt-8 flex flex-col items-center gap-6 animate-fadeIn">
          <div className={`game-status font-mono text-xl font-bold ${won ? "text-green-500" : "text-red-500"}`}>
            {won ? "✓ Ganhaste!" : `✗ A palavra era: ${targetword}`}
          </div>
          <Button2 
            onClick={() => navigate("/wordlelevel")} 
            title="Voltar aos Níveis" 
          />
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <Button1 href="/wordlelevel" title="Sair" />
        </div>
      )}
    </div>
  );
}

export default WordleGame;
