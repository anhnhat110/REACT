import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
function App() {
  const [gameTurns,setGameTurns] = useState([])
  const[activePlayer, setActivePlayer] = useState("X")
  const handleSelect= () => {
    setActivePlayer((curActivePlayer)=>curActivePlayer==="X" ? "O" : "X")
  }
  return (
    <>
    <div id="game-container">
      <ol id="players" className="highlight-player">
      <Player name="Player 1" symbol="X" isActive={activePlayer ==="X"}/>
      <Player name="Player 2" symbol="O" isActive={activePlayer ==="O"}/>
      </ol>
      <GameBoard onSelect={handleSelect} activePlayerSymbol={activePlayer}/>
    </div>
    <Log/>
  </>
  )
  
}

export default App
