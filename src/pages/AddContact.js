import axios from "axios";
import listAPI from "../apis/Listapi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function AddContact() {
    const [input,setInput] = useState({id:"",name:"",email:""})
    const nav = useNavigate();
// Create - post
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(listAPI, input)
    .then(res => {
      console.log(res.data)
      alert("Create data successfully")
      nav("/contact")
  })}
    return (
        <>
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID</label>
                <input onChange={e=>setInput({...input, id: e.target.value})}/>
            </div>
            <div>
                <label>Name</label>
                <input onChange={e=>setInput({...input, name: e.target.value})}/>
            </div>
            <div>
                <label>Description</label>
                <input onChange={e=>setInput({...input, email: e.target.value})}/>
            </div>
            <button>Create</button>
        </form>
      </div>
        </>
    )
}