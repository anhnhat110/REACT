import { useState } from "react"

export default function Player({name,symbol,isActive}) {
    const [isName, setIsName] = useState(name)
    const [isEdit,setIsEdit] = useState(false)
    const handleClick = () => {
        setIsEdit((edit)=>!edit)
        console.log(isEdit)
    }
    const handleChange = (e) => {
        setIsName(e.target.value);
    }
    let playername = <span className="player-name">{isName}</span>;
    if (isEdit) {
        playername = <input type="text" required value={isName} onChange={handleChange}/>;
    }

    return (
        <li className={isActive ? "active" : undefined}>
          <span className="player">{playername}
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleClick}>{isEdit ? 'Save' : 'Edit'}</button>
        </li>
    )
}