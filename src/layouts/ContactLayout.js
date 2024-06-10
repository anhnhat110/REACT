import "./ContactLayout.css"
import { NavLink, Outlet } from "react-router-dom";
export  function ContactLayout(){
    
    return (
        <>
        <h1>Please contact for help</h1>
        <div className="navigation1">
        <NavLink to="ct" className="nav-button1">Contact Address</NavLink>
        <NavLink to="create" className="nav-button1">Add Contact</NavLink>
        </div>
        <div>
        <Outlet/>
        </div>
        </>
    )
}