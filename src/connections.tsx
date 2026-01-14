// @ts-nocheck
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { levels as allLevels } from "./Pages/conexaolvls";
import Button1 from "./components/button1";
import Button2 from "./components/button2";
import "/src/css/connections.css";

// Helper for shuffling
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ConnectionGame() {
  const location = useLocation();
  const navigate = useNavigate();

  // Level & Data State
  const [connectionPacks, setConnectionPacks] = useState([]);
  const [levelNumber, setLevelNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Game Logic State
  const [words, setWords] = useState([]);     
  const [selectedWords, setSelectedWords] = useState([]);   
  const [solvedGroups, setSolvedGroups] = useState([]);     
  const [mistakes, setMistakes] = useState(0);              
  const [message, setMessage] = useState("");               
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // 1. Initialize Level Data
  useEffect(() => {
    let activeLevelData = null;
    let activeLevelNum = null;

    if (location.state && location.state.levelData) {
      activeLevelData = location.state.levelData;
      activeLevelNum = location.state.levelNumber;
    } else {
      // Fallback if user refreshes or enters directly
      const randomIndex = Math.floor(Math.random() * allLevels.length);
      activeLevelData = allLevels[randomIndex];
      activeLevelNum = randomIndex + 1;
    }

    setConnectionPacks(activeLevelData);
    setLevelNumber(activeLevelNum);
    setupGame(activeLevelData);
    setIsLoading(false);
  }, [location.state]);

  const setupGame = (packs) => {
    const flatWords = packs.flatMap(pack =>       
      pack.words.map(word => ({                             
        text: word,
        category: pack.category,
        color: pack.color
      }))
    );
    setWords(shuffle(flatWords));                           
    setSelectedWords([]);                                   
    setSolvedGroups([]);                                    
    setMistakes(0);                                         
    setMessage("");                                       
    setGameOver(false);   
  };

  // 2. Save Progress to Supabase
  const saveWinProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && levelNumber) {
        const { error } = await supabase
          .from('connections_progress') // Ensure this table exists in Supabase
          .upsert({ 
            user_id: user.id, 
            level_number: levelNumber 
          }, { onConflict: 'user_id, level_number' });

        if (error) throw error;
      }
    } catch (err) {
      console.error("Error saving progress:", err.message);
    }
  };

  // 3. Game Actions
  const toggleWord = (word) => {
    if (gameOver || solvedGroups.some(g => g.words.includes(word.text))) return;

    if (selectedWords.find(w => w.text === word.text)) {
      setSelectedWords(selectedWords.filter(w => w.text !== word.text));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) {
      setMessage("Selecione exatamente 4 palavras!");
      return;
    }

    const categories = [...new Set(selectedWords.map(w => w.category))];
    
    if (categories.length === 1) {
      const pack = connectionPacks.find(p => p.category === categories[0]);
      const newSolvedGroups = [...solvedGroups, {
        category: pack.category,
        words: selectedWords.map(w => w.text),
        color: pack.color
      }];
      
      setSolvedGroups(newSolvedGroups);
      setSelectedWords([]);
      setMessage(`✓ Correto: ${pack.category}`);

      if (newSolvedGroups.length === 4) {
        setGameOver(true);
        setMessage("Parabéns! Ganhaste!");
        saveWinProgress();
      }
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setMessage(`✗ Incorreto! Tentativas: ${4 - newMistakes}`);
      
      if (newMistakes >= 4) {
        setGameOver(true);
        setMessage("Fim de jogo! Sem mais tentativas.");
      }
    }
  };

  const handleShuffle = () => {
    const unsolved = words.filter(w => !solvedGroups.some(g => g.words.includes(w.text)));
    const solved = words.filter(w => solvedGroups.some(g => g.words.includes(w.text)));
    setWords([...solved, ...shuffle(unsolved)]);
  };

  // 4. Render Guards
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg2 font-mono text-white">
        <div className="text-xl animate-bounce">Loading...</div>
      </div>
    );
  }

  const remainingWords = words.filter(word => 
    !solvedGroups.some(group => group.words.includes(word.text))
  );

  return (
    <div className="first-div relative"> 
      
      {/* Instructions Overlay */}
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

      {/* Level Indicator */}
      <div className="absolute top-4 left-4 text-white/40 font-mono text-xs">
        Nível {levelNumber}
      </div>

      <button onClick={() => setShowInstructions(true)} className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-500 text-gray-300">?</button>

      <div className="second-div">
        <h1 className="game-header">Conexões</h1>
      </div>

      <div className="third-div">
        <p className="font-mono text-white">Tentativas: {4 - mistakes}/4</p>
        {message && (
          <p className="msg-div" style={{ 
            backgroundColor: message.includes('✓') ? '#0dd353' : message.includes('✗') ? '#880606' : '#0c3e80' 
          }}>
            {message}
          </p>
        )}
      </div>

      {/* Solved Categories */}
      <div className="flex flex-col gap-2 w-full max-w-md px-2">
        {solvedGroups.map((group, index) => (
          <div key={index} className="solved-div animate-fadeIn" style={{ background: group.color }}>
            <div className="font-bold uppercase text-sm">{group.category}</div>
            <div className="text-xs">{group.words.join(", ")}</div>
          </div>
        ))}
      </div>

      {/* Word Grid */}
      {!gameOver && (
        <div className="word-grid mt-4">
          {remainingWords.map((word, index) => {
            const isSelected = selectedWords.find(w => w.text === word.text);
            return (
              <div 
                key={index} 
                className={`map-div transition-all duration-200 ${isSelected ? 'selected-word' : ''}`}
                onClick={() => toggleWord(word)}
                style={{
                  background: isSelected ? '#2b5306' : '#4c1d95',
                  border: isSelected ? '3px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)',
                  transform: isSelected ? 'scale(0.96)' : 'scale(1)'
                }}
              >
                {word.text}
              </div>
            );
          })}
        </div>
      )}

      {/* Action UI */}
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
