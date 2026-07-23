import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button1 from "./components/button1";
import Button2 from "./components/button2";
import "/src/css/connections.css";
import { levels as allLevels } from "./Pages/conexaolvls";
import { supabase } from "./supabaseClient";

const MAX_MISTAKES = 4;

interface ConnectionPack {
  words: string[];
  category: string;
  color: string;
}

interface GameWord {
  text: string;
  category: string;
  color: string;
}

interface SolvedGroup {
  category: string;
  words: string[];
  color: string;
}

interface LocationState {
  levelData?: ConnectionPack[];
  levelNumber?: number;
}

function shuffle<T>(array: T[]) {
  const arr = [...array];

  for (let index = arr.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
  }

  return arr;
}

export default function ConnectionGame() {
  const location = useLocation();
  const navigate = useNavigate();

  const [connectionPacks, setConnectionPacks] = useState<ConnectionPack[]>([]);
  const [levelNumber, setLevelNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [words, setWords] = useState<GameWord[]>([]);
  const [selectedWords, setSelectedWords] = useState<GameWord[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<SolvedGroup[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const state = (location.state ?? {}) as LocationState;
    const randomIndex = Math.floor(Math.random() * allLevels.length);
    const activeLevelData = state.levelData ?? allLevels[randomIndex];
    const activeLevelNumber = state.levelNumber ?? randomIndex + 1;

    setConnectionPacks(activeLevelData);
    setLevelNumber(activeLevelNumber);
    setupGame(activeLevelData);
    setIsLoading(false);
  }, [location.state]);

  const setupGame = (packs: ConnectionPack[]) => {
    const flatWords = packs.flatMap((pack) =>
      pack.words.map((word) => ({
        text: word,
        category: pack.category,
        color: pack.color,
      })),
    );

    setWords(shuffle(flatWords));
    setSelectedWords([]);
    setSolvedGroups([]);
    setMistakes(0);
    setMessage("");
    setGameOver(false);
  };

  const saveWinProgress = async () => {
    if (!levelNumber) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase.from("connections_progress").upsert(
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
  };

  const toggleWord = (word: GameWord) => {
    if (gameOver || solvedGroups.some((group) => group.words.includes(word.text))) return;

    if (selectedWords.some((selectedWord) => selectedWord.text === word.text)) {
      setSelectedWords((currentWords) => currentWords.filter((selectedWord) => selectedWord.text !== word.text));
    } else if (selectedWords.length < 4) {
      setSelectedWords((currentWords) => [...currentWords, word]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) {
      setMessage("Selecione exatamente 4 palavras!");
      return;
    }

    const categories = [...new Set(selectedWords.map((word) => word.category))];

    if (categories.length === 1) {
      const pack = connectionPacks.find((connectionPack) => connectionPack.category === categories[0]);
      if (!pack) return;

      const newSolvedGroups = [
        ...solvedGroups,
        {
          category: pack.category,
          words: selectedWords.map((word) => word.text),
          color: pack.color,
        },
      ];

      setSolvedGroups(newSolvedGroups);
      setSelectedWords([]);
      setMessage(`✓ Correto: ${pack.category}`);

      if (newSolvedGroups.length === 4) {
        setGameOver(true);
        setMessage("Parabéns! Ganhaste!");
        saveWinProgress();
      }

      return;
    }

    const newMistakes = mistakes + 1;
    setMistakes(newMistakes);
    setMessage(`✗ Incorreto! Tentativas: ${MAX_MISTAKES - newMistakes}`);

    if (newMistakes >= MAX_MISTAKES) {
      setGameOver(true);
      setMessage("Fim de jogo! Sem mais tentativas.");
    }
  };

  const handleShuffle = () => {
    const solvedWords = new Set(solvedGroups.flatMap((group) => group.words));
    const unsolved = words.filter((word) => !solvedWords.has(word.text));
    const solved = words.filter((word) => solvedWords.has(word.text));
    setWords([...solved, ...shuffle(unsolved)]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg2 font-mono text-white">
        <div className="text-xl animate-bounce">Loading...</div>
      </div>
    );
  }

  const solvedWords = new Set(solvedGroups.flatMap((group) => group.words));
  const remainingWords = words.filter((word) => !solvedWords.has(word.text));

  return (
    <div className="first-div relative">
      {showInstructions && (
        <div className="font-mono fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-700 bg-[#121213] p-6 text-white shadow-2xl">
            <h2 className="text-center mb-4 border-b border-gray-700 pb-2 text-xl font-bold">Instruções</h2>
            <p className="mb-4 text-sm text-gray-300">Encontre grupos de quatro palavras com um tema comum.</p>
            <div className="flex justify-center">
              <Button2 title="Começar" onClick={() => setShowInstructions(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 text-white/40 font-mono text-xs">Nível {levelNumber}</div>

      <button
        onClick={() => setShowInstructions(true)}
        className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-500 text-gray-300"
      >
        ?
      </button>

      <div className="second-div">
        <h1 className="game-header">Conexões</h1>
      </div>

      <div className="third-div">
        <p className="font-mono text-white">Tentativas: {MAX_MISTAKES - mistakes}/4</p>
        {message && (
          <p
            className="msg-div"
            style={{
              backgroundColor: message.includes("✓") ? "#0dd353" : message.includes("✗") ? "#880606" : "#0c3e80",
            }}
          >
            {message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md px-2">
        {solvedGroups.map((group) => (
          <div key={group.category} className="solved-div animate-fadeIn" style={{ background: group.color }}>
            <div className="font-bold uppercase text-sm">{group.category}</div>
            <div className="text-xs">{group.words.join(", ")}</div>
          </div>
        ))}
      </div>

      {!gameOver && (
        <div className="word-grid mt-4">
          {remainingWords.map((word) => {
            const isSelected = selectedWords.some((selectedWord) => selectedWord.text === word.text);

            return (
              <button
                key={`${word.category}-${word.text}`}
                className={`map-div transition-all duration-200 ${isSelected ? "selected-word" : ""}`}
                onClick={() => toggleWord(word)}
                style={{
                  background: isSelected ? "#2b5306" : "#4c1d95",
                  border: isSelected ? "3px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
                  transform: isSelected ? "scale(0.96)" : "scale(1)",
                }}
              >
                {word.text}
              </button>
            );
          })}
        </div>
      )}

      {!gameOver ? (
        <div className="multiple-btns mt-6">
          <Button2 onClick={handleShuffle} title="Baralhar" />
          <Button2 onClick={() => setSelectedWords([])} title="Limpar" />
          <Button2 onClick={handleSubmit} title="Submeter" />
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-4">
          <Button2 onClick={() => navigate("/connectionlevel")} title="Voltar aos Níveis" />
        </div>
      )}

      <div className="mostbottomdiv mt-8">
        <Button1 href="/connectionlevel" title="Sair" />
      </div>
    </div>
  );
}
