import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import listAPI from "../apis/Listapi";

export function UpdateContact() {
    const {id} = useParams();
    const[data,setData]=useState([])
    const nav = useNavigate();
    useEffect(()=>{
        axios.get(listAPI+id)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(listAPI+id,data)
        .then(res => {
            alert("Update successfully");
            nav("/")
        })
    }
    return (
        <>
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID</label>
                <input  value={data.id} 
                onChange={e=>setData({...data, id: e.target.value})}/>
            </div>
            <div>
                <label>Name</label>
                <input value={data.name}
                    onChange={e=>setData({...data,name: e.target.value})}/>
            </div>
            <div>
                <label>Description</label>
                <input value={data.email}
                    onChange={e=>setData({...data, email: e.target.value})}/>
            </div>
            <button>Update</button>
        </form>
      </div>
        </>
    )
}