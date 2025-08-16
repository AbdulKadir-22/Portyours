import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger menu for mobile */}
      <div className="hamburger" onClick={toggleNavbar}>
        ☰
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="overlay" onClick={closeNavbar}></div>}

      {/* Mobile Sidebar */}
      <nav className={`mobile-navbar ${isOpen ? "open" : ""}`}>
        <h1 className="logo">
          <NavLink to="/portfolio" onClick={closeNavbar}>Portfolio</NavLink>
        </h1>
        <div className="nav-links">
          <NavLink to="/homeportfolio" className="nav-item" onClick={closeNavbar}>Home</NavLink>
          <NavLink to="/about" className="nav-item" onClick={closeNavbar}>About</NavLink>
          <NavLink to="/skills" className="nav-item" onClick={closeNavbar}>Skills</NavLink>
          <NavLink to="/projects" className="nav-item" onClick={closeNavbar}>Projects</NavLink>
          <NavLink to="/contact" className="nav-item" onClick={closeNavbar}>Contact</NavLink>
        </div>
      </nav>

      {/* Navbar for Desktop  */}
      <div className="top-navbar">
        <h1 className="logo">
          <NavLink to="/">Portfolio</NavLink>
        </h1>
        <div className="nav-links">
          <NavLink to="/homeportfolio" className="nav-item">Home</NavLink>
          <NavLink to="/about" className="nav-item">About</NavLink>
          <NavLink to="/skills" className="nav-item">Skills</NavLink>
          <NavLink to="/projects" className="nav-item">Projects</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
