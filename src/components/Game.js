import './Game.css'

const Game = ({ verifyLetter }) => {
  return (
    <div className='game'>
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">Dica sobre a palavra: <span>Dica...</span></h3>
      <div className="wordContainer">
        <span className='letter'>a</span>
        <span className='blankSquare'></span>
        
      </div>
      <div className="letterContainer">
          <p>tente adivinhar uma letra da palarva: </p>
          <form>
            <input type="text" maxLength="1" name="letter" required />
            <button>Jogue</button>
          </form>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras ja utilizadas:</p>
          <span>a,</span>
          <span>b,</span>
        </div>
    </div>
  )
}

export default Game