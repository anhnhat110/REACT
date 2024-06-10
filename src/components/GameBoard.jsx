import { useState } from "react";

const initGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
export default function GameBoard({onSelect,activePlayerSymbol}) {
    const [gameBoard,setGameBoard] = useState(initGameBoard);
    const handleSelect = (rowIndex,colIndex) => {
        setGameBoard((prev)=> {
            const updatedBoard = [...prev.map(innerArray => [...innerArray])]
            updatedBoard[rowIndex][colIndex] =activePlayerSymbol;
            return updatedBoard;
        });
        onSelect();
    }
    return (
    <>
        <ol id="game-board">
        {gameBoard.map((row, rowIndex)=><li key={rowIndex}>
            <ol>
            {row.map((playerSymbol,colIndex)=>
                (<li key={colIndex}>
                    <button onClick={()=>handleSelect(rowIndex,colIndex)}>
                    {playerSymbol}
                    </button>
                </li>
            ))}
            </ol>
        </li>)}
        </ol>
    </>
    )
}