import { NavLink, Outlet } from "react-router-dom";
import Navbar from './Navbar';
import "./RootLayout.css"
export function RootLayout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}