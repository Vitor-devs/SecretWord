import './End.css';

const End = ({retry}) => {
  return (
    <div>
        <h2>Fim de jogo</h2>
        <button onClick={retry}>Clique aqui para reiniciar</button>
    </div>
  )
}

export default End