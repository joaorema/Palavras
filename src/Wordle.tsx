// @ts-nocheck
import { useState, useEffect } from "react";
import "./css/wordle.css";
import { api } from "./api/api";
import { Navigate, useNavigate } from "react-router-dom";
import Button1 from "./components/button1";
import Button2 from "./components/button2";

const words = [
  "FORTE",
  "PRATO",
  "LIVRO",
  "CARRO",
  "PRAIA",
  "TRELA",
  "MIUDA",
  "BROAS",
  "CHITA",
  "SOGRO",
  "FINTA",
  "BRUXA",
  "CANJA",
  "BANHO",
  "ROLHA",
  "NINHO",
  "MANTA",
  "GAITA",
  "XISTO",
  "MALTA",
  "VENTO",
  "CHUVA",
  "NOITE",
  "TARDE",
  "PEDRA",
  "TERRA",
  "FLORE",
  "SERRA",
  "MONTE",
  "LAGOA",
  "LAGOA",
  "CLARO",
  "NUVEM",
  "GRAMA",
  "AREIA",
  "PONTE",
  "PORTA",
  "CHAVE",
  "MESA",
  "GARFO",
  "JARRA",
  "BOLSA",
  "CESTO",
  "CAIXA",
  "VIDRO",
  "PAPEL",
  "TEXTO",
  "CARTA",
  "NAVIO",
  "TIGRE",
  "ZEBRA",
  "COBRA",
  "PEIXE",
  "MOSCA",
  "PULGA",
  "CISNE",
  "GRILO",
  "CARNE",
  "FRUTA",
  "VINHO",
  "LEITE",
  "TORTA",
  "PUDIM",
  "MOLHO",
  "ARROZ",
  "MILHO",
  "TRIGO",
  "AVEIA",
  "CALDO",
  "JOVEM",
  "VELHO",
  "PRIMO",
  "AMIGO",
  "DENTE",
  "PERNA",
  "NARIZ",
  "BARBA",
  "OMBRO",
  "SONHO",
  "TEMPO",
  "SORTE",
  "MORTE",
  "PODER",
  "SABER",
  "FAZER",
  "DIZER",
  "ESTAR",
  "HAVER",
  "QUASE",
  "MUITO",
  "POUCO",
  "ANTES",
  "AGORA",
  "FINAL",
  "TOTAL",
];
const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

function WordleGame() {
  const [targetword, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentguess, setCurrentGuess] = useState("");
  const [currentrow, setCurrentRow] = useState(0);
  const [gameover, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [letterstatus, setLetterStatus] = useState({});

  const navigate = useNavigate();

  const backbtn = () => {
    navigate("/games");
  };
  // Initialize game
  useEffect(() => {
    const pickedWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(pickedWord);
    console.log(pickedWord);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameover) return;
      if (e.key === "Enter") handleSubmit();
      else if (e.key === "Backspace") handleDelete();
      else if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentguess, gameover, targetword]);

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
      // ← Use constant
      alert("Palavra incompleta!");
      return;
    }

    const newGuess = [...guesses];
    newGuess[currentrow] = currentguess;
    setGuesses(newGuess);

    updateLetterStatus(currentguess);

    // Check for win
    if (currentguess === targetword) {
      setWon(true);
      setGameOver(true);
      setTimeout(() => {
        alert("Parabéns! Você ganhou! ");
      }, 500);
      const user = api.getCurrentUser();
      if (user) {
        try {
          await api.addWin("wordle");
          console.log("added a win to player db");
        } catch (err) {
          console.error("failed to register win!", err);
        }
      }
      return;
    }

    // Check for loss
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

    if (!guess || guess.length <= colIndex) return "";
    if (rowIndex > currentrow) return "";
    if (rowIndex === currentrow && !gameover) return "";

    const letter = guess[colIndex];
    if (targetword[colIndex] === letter) return "correct";
    else if (targetword.includes(letter)) return "present";
    else return "absent";
  };

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord);
    setGuesses(Array(6).fill(""));
    setCurrentGuess("");
    setCurrentRow(0);
    setGameOver(false);
    setWon(false);
    setLetterStatus({});

    console.log("New word: ", randomWord);
  };

  return (
    <div className="wordle-container">
      <div>
        <h1 className="font-mono font-bold text-[20px]">Palavras</h1>
      </div>

      {/* Game Grid */}
      <div className="wordle-grid font-mono">
        {guesses.map((guess, rowIndex) => (
          <div key={rowIndex} className="wordle-row">
            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
              /* ← FIXED HERE */
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

      {/* Keyboard */}
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
          <Button1 href="/games" title="Voltar"></Button1>
        </div>
      </div>

      {/* Game status */}
      {gameover && (
        <div className="game-status">
          {won ? "🎉 Você venceu!" : `😢 A palavra era: ${targetword}`}
        </div>
      )}
    </div>
  );
}

export default WordleGame;
