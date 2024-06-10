import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navigation">
            <NavLink to="/home" className="nav-button">Home</NavLink>
            <NavLink to="/about" className="nav-button">About</NavLink>
            <NavLink to="/contact" className="nav-button">Contact</NavLink>
            <NavLink to="/menu" className="nav-button">Menu</NavLink>
        </div>
    </nav>
  );
}
export default Navbar