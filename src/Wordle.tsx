import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button1 from "./components/button1";
import Button2 from "./components/button2";
import "./css/wordle.css";
import { getWordleWord, WORDLE_WORDS } from "./data/wordleLevels";
import { supabase } from "./supabaseClient";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const BACKSPACE_KEY = "⌫";

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [BACKSPACE_KEY, "Z", "X", "C", "V", "B", "N", "M", "ENTER"],
] as const;

type LetterStatus = "correct" | "present" | "absent";

interface LocationState {
  levelNumber?: number;
}

function WordleGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const { levelNumber } = (location.state ?? {}) as LocationState;
  const targetWord = levelNumber ? getWordleWord(levelNumber) : undefined;
  const hasNextLevel = Boolean(levelNumber && levelNumber < WORDLE_WORDS.length);

  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [letterStatus, setLetterStatus] = useState<Record<string, LetterStatus>>({});
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!targetWord) {
      navigate("/wordlelevel", { replace: true });
    }
  }, [navigate, targetWord]);

  const resetGame = useCallback(() => {
    setGuesses(Array(MAX_GUESSES).fill(""));
    setCurrentGuess("");
    setCurrentRow(0);
    setGameOver(false);
    setWon(false);
    setLetterStatus({});
  }, []);

  const saveProgress = useCallback(async () => {
    if (!levelNumber) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase.from("player_progress").upsert(
        {
          user_id: user.id,
          level_number: levelNumber,
        },
        { onConflict: "user_id, level_number" },
      );

      if (error) throw error;
    } catch (err) {
      console.error("Erro ao guardar progresso:", err);
    }
  }, [levelNumber]);

  const updateLetterStatus = useCallback(
    (guess: string) => {
      if (!targetWord) return;

      setLetterStatus((currentStatus) => {
        const nextStatus = { ...currentStatus };

        for (let index = 0; index < guess.length; index += 1) {
          const letter = guess[index];

          if (targetWord[index] === letter) {
            nextStatus[letter] = "correct";
          } else if (targetWord.includes(letter) && nextStatus[letter] !== "correct") {
            nextStatus[letter] = "present";
          } else if (!nextStatus[letter]) {
            nextStatus[letter] = "absent";
          }
        }

        return nextStatus;
      });
    },
    [targetWord],
  );

  const handleKeyPress = useCallback((letter: string) => {
    setCurrentGuess((guess) => (guess.length < WORD_LENGTH ? guess + letter : guess));
  }, []);

  const handleDelete = useCallback(() => {
    setCurrentGuess((guess) => guess.slice(0, -1));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!targetWord) return;

    if (currentGuess.length !== WORD_LENGTH) {
      alert("Palavra incompleta!");
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess;
    setGuesses(newGuesses);
    updateLetterStatus(currentGuess);

    if (currentGuess === targetWord) {
      setWon(true);
      setGameOver(true);
      await saveProgress();
      return;
    }

    if (currentRow === MAX_GUESSES - 1) {
      setGameOver(true);
      return;
    }

    setCurrentRow((row) => row + 1);
    setCurrentGuess("");
  }, [currentGuess, currentRow, guesses, saveProgress, targetWord, updateLetterStatus]);

  const handleNextLevel = () => {
    if (!levelNumber || !hasNextLevel) return;

    resetGame();
    setShowInstructions(false);
    navigate("/wordle", {
      replace: true,
      state: { levelNumber: levelNumber + 1 },
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showInstructions || gameOver) return;

      if (event.key === "Enter") {
        handleSubmit();
      } else if (event.key === "Backspace") {
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, handleDelete, handleKeyPress, handleSubmit, showInstructions]);

  const getCellStatus = (rowIndex: number, colIndex: number) => {
    if (!targetWord) return "";

    const guess = guesses[rowIndex];
    if (!guess || rowIndex > currentRow || (rowIndex === currentRow && !gameOver)) return "";

    const letter = guess[colIndex];
    if (targetWord[colIndex] === letter) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  };

  if (!targetWord) return null;

  return (
    <div className="wordle-container relative">
      {levelNumber && (
        <div className="absolute top-4 left-4 text-white/40 font-mono text-xs">
          Nível {levelNumber}
        </div>
      )}

      <button
        onClick={() => setShowInstructions(true)}
        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 text-gray-300"
      >
        ?
      </button>

      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-700 bg-[#121213] p-6 text-white shadow-2xl">
            <h2 className="text-center mb-4 border-b border-gray-700 pb-2 text-xl font-bold font-mono">
              Instruções
            </h2>
            <p className="mb-4 text-center text-sm text-gray-300 font-mono">
              Adivinha a palavra em 6 tentativas.
            </p>
            <div className="flex justify-center">
              <Button2 title="Começar" onClick={() => setShowInstructions(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="game-header-container">
        <h1 className="font-mono font-bold text-[24px] text-white">Palavras</h1>
      </div>

      <div className="wordle-grid font-mono">
        {guesses.map((guess, rowIndex) => (
          <div key={rowIndex} className="wordle-row">
            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
              const letter = rowIndex === currentRow ? currentGuess[colIndex] : guess[colIndex];
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

      <div className="wordle-keyboard font-mono mt-4">
        {KEYBOARD_ROWS.map((row) => (
          <div key={row.join("")} className="keyboard-row">
            {row.map((key) => {
              const status = letterStatus[key] || "";

              return (
                <button
                  key={key}
                  className={`keyboard-key ${status} ${key.length > 1 ? "special-key" : ""}`}
                  onClick={() => {
                    if (gameOver) return;
                    if (key === "ENTER") handleSubmit();
                    else if (key === BACKSPACE_KEY) handleDelete();
                    else handleKeyPress(key);
                  }}
                  disabled={gameOver}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {gameOver ? (
        <div className="wordle-actions flex flex-col items-center animate-fadeIn">
          <div className={`game-status font-mono text-xl font-bold ${won ? "text-green-500" : "text-red-500"}`}>
            {won ? "✓ Ganhaste!" : `✗ A palavra era: ${targetWord}`}
          </div>
          {won && hasNextLevel && <Button2 onClick={handleNextLevel} title="Next level" />}
          <Button2 onClick={() => navigate("/wordlelevel")} title="Voltar aos Níveis" />
        </div>
      ) : (
        <div className="wordle-actions flex justify-center">
          <Button1 href="/wordlelevel" title="Sair" />
        </div>
      )}
    </div>
  );
}

export default WordleGame;
