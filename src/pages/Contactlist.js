import { useEffect, useState } from "react"
import axios from 'axios'
import "./Contactlist.css"
import listAPI from "../apis/Listapi";
import { NavLink } from "react-router-dom";

export function Contactlist(){
  const [columns, setColumns] = useState([]);
  const [record, setRecord] = useState([]);
// Read - get
  useEffect(() => {
    axios.get("http://localhost:3030/list")
      .then(response => {
        // Access the array of data from the response
        // Update the state with the fetched data
        //Debug
        console.log(Object.keys(response.data[0]));
        console.log(response.data)

        setColumns(Object.keys(response.data[0]));
        setRecord(response.data)
      });
  }, []);


  return (
    <div>
      <h2>LIST</h2>
      <div>
      <table>
        <thead>
          <tr>
          {columns.map((column,index) => (
            <th key={index}>
             {column}
            </th>
          ))}
          </tr>
        </thead>
        <tbody>
          {record.map((d,i)=> (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <NavLink to={`update/${d.id}`}>Edit</NavLink>
                {/* <NavLink to={'update'}>Edit</NavLink> */}
                <NavLink to="delete">Delete</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
}