// @ts-nocheck
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button1 from "./components/button1";
import { levels } from "./Pages/conexaolvls";
import Button2 from "./components/button2";
import "/src/css/connections.css";

//game info
const randomIndex = Math.floor(Math.random() * levels.length)
const connectionPacks = levels[randomIndex]

//shuffle ft
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ConnectionGame() {
  const [words, setWords] = useState([]);     
  const [selectedWords, setSelectedWords] = useState([]);   //player choice (max 4) 
  const [solvedGroups, setSolvedGroups] = useState([]);     //correct pack of 4 words
  const [mistakes, setMistakes] = useState(0);              //nbr of trys (starts at 0)
  const [message, setMessage] = useState("");               //incorrect or correct msg
  const [gameOver, setGameOver] = useState(false);
  
  const navigate = useNavigate();
  const backBtn = () => {
    navigate("/games")
  }

  useEffect(() => {                                         //starts the game once when page is loaded to dom
    initializeGame();
  }, []);

  const initializeGame = () => 
  {
    const randomLvlIndex = Math.floor(Math.random() * levels.length)
    
    const flatWords = connectionPacks.flatMap(pack =>       //breaks the array into 16 individual objects (text:limao , category : sabores de gelado, color)
      pack.words.map(word => ({                             //
        text: word,
        category: pack.category,
        color: pack.color
      }))
    );
    setWords(shuffle(flatWords));                           //shuffles the 16 objects
    setSelectedWords([]);                                   //sets to empty array
    setSolvedGroups([]);                                    //sets to empty array
    setMistakes(0);                                         //sets mistakes to 0
    setMessage("");                                       
    setGameOver(false);                                     
  };

  const toggleWord = (word) => {
    if (solvedGroups.some(group => group.words.includes(word.text)))    //quick check to avoid using words that already in correct packs 
    {    
      return;
    }

    if (selectedWords.find(w => w.text === word.text)) 
    {
      setSelectedWords(selectedWords.filter(w => w.text !== word.text));  //removes word from selected if it was already selected
    } 
    else if (selectedWords.length < 4)                                    //if word not selected and theres still less than 4 words toggle it
    {        
      setSelectedWords([...selectedWords, word]);                         //add it to array of selected words
    }
  };

  const handleShuffle = () => 
  {
    const remainingWords = words.filter(word =>                           //checks words that are not solved 
      !solvedGroups.some(group => group.words.includes(word.text))
    );
    const solvedWords = words.filter(word =>                              //
      solvedGroups.some(group => group.words.includes(word.text))
    );
    setWords([...solvedWords, ...shuffle(remainingWords)]);               //sets the solved words and shuffles the others remaining
    setMessage("");                                                       
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) {                                     //if not selected 4 words
      setMessage("Selecione exatamente 4 palavras!");
      return;
    }

    const categories = [...new Set(selectedWords.map(w => w.category))];  //extracts the category of the selected words
    
    if (categories.length === 1) 
    {                                                                     //if they all have the same category
      const pack = connectionPacks.find(p => p.category === categories[0]);
      setSolvedGroups([...solvedGroups, {
        category: pack.category,
        words: selectedWords.map(w => w.text),
        color: pack.color
      }]);
      setSelectedWords([]);                                               //clears the selected words after completing the pack of 4
      setMessage(`✓ Correto! ${pack.category}`);                          //prints correct message
      
      if (solvedGroups.length + 1 === connectionPacks.length) 
      {           //is solvergroups == connetionpatck lengh then we won
        setGameOver(true);
        setMessage("Parabéns! Ganhaste!");
      }
    } 
    else                                                                  //if selected words have different categorys (failed)
    {
      setMistakes(mistakes + 1);                                          //set mistakes +1
      setMessage(`✗ Incorreto! Tentativas restantes: ${4 - mistakes - 1}`);//display how many left
      
      if (mistakes + 1 >= 4)                                              //if mistaked >= 4 game over
      {
        setGameOver(true);
        setMessage("😞 Fim de jogo! Sem mais tentativas.");
      }
    }
  };

  const handleDeselectAll = () => {                                       //removes all selected words from the array
    setSelectedWords([]);
    setMessage("");
  };

  const remainingWords = words.filter(word =>                             //returns the remaining words that are not yet correct
    !solvedGroups.some(group => group.words.includes(word.text))
  );

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', color: "white", display: "flex", alignItems: "center"}}>
          Conexões
        </h1>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <p style={{ margin: '5px 0', fontWeight: '600' }}>
          Encontre grupos de 4 palavras relacionadas
        </p>
        <p style={{ margin: '5px 0' }}>
          Erros: {mistakes}/4
        </p>
        {message && (
          <p style={{
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            background: message.includes('✓') ? '#0dd353ff' : message.includes('✗') ? '#880606ff' : '#0c3e80ff',
            fontWeight: '600'
          }}>
            {message}
          </p>
        )}
      </div>

      {/* Grupos Resolvidos */}
      {solvedGroups.map((group, index) => (
        <div 
          key={index}
          className="solved-div"
          style={{
            background: group.color,
          }}
        >
          <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '1.1rem' }}>
            {group.category}
          </div>
          <div style={{ fontWeight: '600' }}>
            {group.words.join(", ")}
          </div>
        </div>
      ))}

      {/* Grelha de Palavras */}
      {!gameOver && remainingWords.length > 0 && (
        <div className="word-grid">
          {remainingWords.map((word, index) => {
            const isSelected = selectedWords.find(w => w.text === word.text);
            return (
              <div className="map-div" key={index} onClick={() => toggleWord(word)} style={{background: isSelected ? '#1e293b' : '#8f036c',border: isSelected ? '3px solid #fbbf24' : '1px solid #ccc',transform: isSelected ? 'scale(0.95)' : 'scale(1)'}}>
                {word.text}
              </div>
            );
          })}
        </div>
      )}

      {/* Botões de Ação */}
      {!gameOver && remainingWords.length > 0 && 
      (
        <div className="multiple-btns">
          <Button2 onClick={handleShuffle} title="Baralhar"></Button2>
          <Button2 onClick={handleDeselectAll} title="Remover Escolhas"></Button2>
          <Button2 onClick={handleSubmit} title="Submeter"></Button2>
        </div>
      )}
      <div className="mostbottomdiv">
        <Button1 href="/games" title="Voltar"></Button1>  
      </div>
    </div>
  );
}

export default ConnectionGame;