//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from "react";

//Data
import { wordList } from './data/words';

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import End from './components/End';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]

const guessedQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessedQty);
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    //pegando categoria
    // pegando todas as categorias (As keys do obj)
    const categories = Object.keys(words);
    //               pega a categoria com um calculo para pegar uma aleatoria
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pegando palavra da categoria acima
    //    nome  //nome do array [de qual array][calculo para pegar o indice da categoria ja selecionada] 
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    //Desestruturando para poder usar em outros locais
    return { word, category }
  }, [words]);

  //Starta o game
  const startGame = useCallback(() => {
    //Limpa as letras
    clearLetterStates()
    //escolher palavra e categoria
    const { word, category } = pickWordAndCategory();

    // transformando em letras
    let wordLetters = word.split("");

    //mandando as letras para minuscula
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //setando status
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //Processa a letra
  const verifyLetter = (letter) => {

    const minusLetter = letter.toLowerCase();
    //Checking if the letter has already been used before
    if (guessedLetters.includes(minusLetter) || wrongLetters.includes(minusLetter)) {
      return;
    }

    //Mandando a letra ou tirando uma chance 
    if (letters.includes(minusLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        minusLetter,
      ]);

    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        minusLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  //Checa se o usuário perde
  useEffect(() => {

    if (guesses === 0) {
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]) //Aqui diz o que é monitorado com o nome da variável

  //Check se ganhou
  useEffect(() => {
    //Remove ter que colocar letras repetidas
    const uniqueLetters = [...new Set(letters)];

    //Agora pra ganhar
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 10);


      //restartar game
      startGame();
    }


  }, [guessedLetters, startGame, letters]);

  //Leva para o inicio pq perdeu
  const retry = () => {
    setScore(0);
    setGuesses(guessedQty);
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score} />}
      {gameStage === 'end' && <End retry={retry} score={score} />}

    </div>
  );
}

export default App;
