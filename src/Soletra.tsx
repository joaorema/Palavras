import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button1 from "./components/button1";
import Button2 from "./components/button2";
import "./css/soletra.css";
import { getSoletraLevel, SOLETRA_LEVELS } from "./data/soletraLevels";
import { supabase } from "./supabaseClient";

interface LocationState {
  levelNumber?: number;
}

type MessageKind = "info" | "success" | "error";

function normalizeWord(word: string) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function scoreWord(word: string, letters: string[]) {
  const usesAllLetters = letters.every((letter) => word.includes(letter));
  const baseScore = word.length === 4 ? 1 : word.length;

  return usesAllLetters ? baseScore + 7 : baseScore;
}

function shuffleLetters(letters: string[], center: string) {
  const outerLetters = letters.filter((letter) => letter !== center);

  for (let index = outerLetters.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [outerLetters[index], outerLetters[swapIndex]] = [outerLetters[swapIndex], outerLetters[index]];
  }

  return [center, ...outerLetters];
}

function SoletraGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const { levelNumber } = (location.state ?? {}) as LocationState;
  const level = levelNumber ? getSoletraLevel(levelNumber) : undefined;
  const hasNextLevel = Boolean(levelNumber && levelNumber < SOLETRA_LEVELS.length);

  const [letters, setLetters] = useState(level ? shuffleLetters(level.letters, level.center) : []);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [message, setMessage] = useState("Forma palavras com 4 ou mais letras.");
  const [messageKind, setMessageKind] = useState<MessageKind>("info");
  const [completed, setCompleted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const acceptedWords = useMemo(() => new Set(level?.words ?? []), [level]);
  const foundSet = useMemo(() => new Set(foundWords), [foundWords]);
  const score = useMemo(
    () => foundWords.reduce((total, word) => total + (level ? scoreWord(word, level.letters) : 0), 0),
    [foundWords, level],
  );
  const progressPercent = level ? Math.min(100, Math.round((score / level.targetScore) * 100)) : 0;

  useEffect(() => {
    if (!level) {
      navigate("/soletralevel", { replace: true });
    }
  }, [level, navigate]);

  const resetGame = useCallback(() => {
    if (!level) return;

    setLetters(shuffleLetters(level.letters, level.center));
    setCurrentWord("");
    setFoundWords([]);
    setMessage("Forma palavras com 4 ou mais letras.");
    setMessageKind("info");
    setCompleted(false);
  }, [level]);

  const saveProgress = useCallback(async () => {
    if (!levelNumber) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase.from("soletra_progress").upsert(
        {
          user_id: user.id,
          level_number: levelNumber,
        },
        { onConflict: "user_id, level_number" },
      );

      if (error) throw error;
    } catch (err) {
      console.error("Erro ao guardar progresso do Soletra:", err);
    }
  }, [levelNumber]);

  useEffect(() => {
    if (!level || completed || score < level.targetScore) return;

    setCompleted(true);
    setMessage("Objetivo completo! Continua a descobrir palavras ou avanca.");
    setMessageKind("success");
    saveProgress();
  }, [completed, level, saveProgress, score]);

  const addLetter = useCallback(
    (letter: string) => {
      if (!level) return;

      setCurrentWord((word) => word + letter);
      setMessageKind("info");
      setMessage("");
    },
    [level],
  );

  const deleteLetter = useCallback(() => {
    setCurrentWord((word) => word.slice(0, -1));
  }, []);

  const clearWord = useCallback(() => {
    setCurrentWord("");
  }, []);

  const submitWord = useCallback(() => {
    if (!level) return;

    const guess = normalizeWord(currentWord);
    const allowedLetters = new Set(level.letters);
    const usesOnlyLevelLetters = [...guess].every((letter) => allowedLetters.has(letter));

    if (guess.length < 4) {
      setMessage("A palavra precisa de pelo menos 4 letras.");
      setMessageKind("error");
      return;
    }

    if (!guess.includes(level.center)) {
      setMessage(`A palavra tem de usar a letra central ${level.center}.`);
      setMessageKind("error");
      return;
    }

    if (!usesOnlyLevelLetters) {
      setMessage("Usa apenas as letras do favo.");
      setMessageKind("error");
      return;
    }

    if (!acceptedWords.has(guess)) {
      setMessage("Ainda nao temos essa palavra na lista.");
      setMessageKind("error");
      return;
    }

    if (foundSet.has(guess)) {
      setMessage("Essa ja foi encontrada.");
      setMessageKind("info");
      setCurrentWord("");
      return;
    }

    const gained = scoreWord(guess, level.letters);
    setFoundWords((words) => [...words, guess].sort());
    setCurrentWord("");
    setMessage(`Boa! +${gained} pontos.`);
    setMessageKind("success");
  }, [acceptedWords, currentWord, foundSet, level]);

  const handleShuffle = () => {
    if (!level) return;

    setLetters(shuffleLetters(level.letters, level.center));
  };

  const handleNextLevel = () => {
    if (!levelNumber || !hasNextLevel) return;

    const nextLevelNumber = levelNumber + 1;
    const nextLevel = getSoletraLevel(nextLevelNumber);

    resetGame();
    setLetters(shuffleLetters(nextLevel.letters, nextLevel.center));
    setShowInstructions(false);
    navigate("/soletra", {
      replace: true,
      state: { levelNumber: nextLevelNumber },
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showInstructions || !level) return;

      if (event.key === "Enter") {
        submitWord();
      } else if (event.key === "Backspace") {
        deleteLetter();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        const letter = event.key.toUpperCase();
        if (level.letters.includes(letter)) addLetter(letter);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addLetter, deleteLetter, level, showInstructions, submitWord]);

  if (!level || !levelNumber) return null;

  return (
    <div className="soletra-container font-mono">
      <div className="soletra-topbar">
        <span>Nivel {levelNumber}</span>
        <button onClick={() => setShowInstructions(true)} aria-label="Abrir instrucoes">
          ?
        </button>
      </div>

      {showInstructions && (
        <div className="soletra-modal">
          <div className="soletra-modal-box">
            <h2>Instrucoes</h2>
            <p>Cria palavras com 4 ou mais letras. Todas as palavras precisam da letra central.</p>
            <p>Palavras maiores valem mais pontos. Usa todas as letras para ganhar bonus.</p>
            <Button2 title="Comecar" onClick={() => setShowInstructions(false)} />
          </div>
        </div>
      )}

      <header className="soletra-header">
        <span>Soletra</span>
        <h1>Descobre palavras</h1>
      </header>

      <section className="soletra-score-panel" aria-label="Progresso do nivel">
        <div>
          <span>Pontos</span>
          <strong>
            {score}/{level.targetScore}
          </strong>
        </div>
        <div className="soletra-progress-track">
          <div className="soletra-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </section>

      <main className="soletra-board">
        <section className="soletra-play-area">
          <div className="soletra-current-word" aria-label="Palavra atual">
            {currentWord || " "}
          </div>

          <div className="soletra-hive" aria-label="Letras disponiveis">
            {letters.map((letter, index) => {
              const isCenter = letter === level.center;

              return (
                <button
                  key={`${letter}-${index}`}
                  className={`soletra-tile soletra-tile-${index} ${isCenter ? "center" : ""}`}
                  onClick={() => addLetter(letter)}
                  aria-label={`Adicionar letra ${letter}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="soletra-actions">
            <button onClick={deleteLetter}>Apagar</button>
            <button onClick={handleShuffle}>Rodar</button>
            <button onClick={submitWord}>Submeter</button>
            <button onClick={clearWord}>Limpar</button>
          </div>

          <p className={`soletra-message soletra-message-${messageKind}`} role="status" aria-live="polite">
            {message}
          </p>
        </section>

        <aside className="soletra-found-panel">
          <div className="soletra-found-heading">
            <span>Encontradas</span>
            <strong>
              {foundWords.length}/{level.words.length}
            </strong>
          </div>
          <div className="soletra-found-list">
            {foundWords.length ? (
              foundWords.map((word) => <span key={word}>{word}</span>)
            ) : (
              <em>As tuas palavras aparecem aqui.</em>
            )}
          </div>
        </aside>
      </main>

      <div className="soletra-footer-actions">
        {completed && hasNextLevel && <Button2 title="Next level" onClick={handleNextLevel} />}
        {completed && !hasNextLevel && <span className="soletra-complete-note">Todos os niveis completos.</span>}
        <Button2 title="Try again" onClick={resetGame} />
        <Button1 href="/soletralevel" title="Sair" />
      </div>
    </div>
  );
}

export default SoletraGame;
