//CSS
import './App.css';

//React
import { useCallback, useEffect, useState} from "react";

//Data
import {wordList} from './data/words';

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import End from './components/End';

const stages = [ 
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"},
]

function App() {
  const[gameStage, setGameStage] = useState(stages[0].name);
  const[words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const pickWordAndCategory = () =>{
    //pegando categoria
    // pegando todas as categorias (As keys do obj)
    const categories = Object.keys(words);
    //               pega a categoria com um calculo para pegar uma aleatoria
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    //pegando palavra da categoria acima
    //    nome  //nome do array [de qual array][calculo para pegar o indice da categoria ja selecionada] 
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    //Desestruturando para poder usar em outros locais
    return {word, category}
  }

  //Starta o game
  const startGame = () =>{
    //escolher palavra e categoria
    const {word, category} = pickWordAndCategory();

    // transformando em letras
    let wordLetters = word.split("");
    
    //mandando as letras para minuscula
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    console.log(wordLetters)
    
    //setando status
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(letters)
    setGameStage(stages[1].name);
  }

  //Processa a letra
  const verifyLetter = () =>{
    setGameStage(stages[2].name);
  }

  //Leva para o inicio pq perdeu
  const retry = () =>{
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <End retry={retry}/>}

    </div>
  );
}

export default App;
