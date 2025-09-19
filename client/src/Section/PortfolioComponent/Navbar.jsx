import React, { useState } from "react";
// DELETED: import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  // ✨ Helper to create links, avoids repetition
  const navLinks = [
    { href: "#home", text: "Home" },
    { href: "#about", text: "About" },
    { href: "#skills", text: "Skills" },
    { href: "#projects", text: "Projects" },
    { href: "#contact", text: "Contact" },
  ];

  return (
    <>
      <div className="hamburger" onClick={toggleNavbar}>☰</div>
      {isOpen && <div className="overlay" onClick={closeNavbar}></div>}

      <nav className={`mobile-navbar ${isOpen ? "open" : ""}`}>
        <h1 className="logo"><a href="#home" onClick={closeNavbar}>Portfolio</a></h1>
        <div className="nav-links">
            {/* ✨ Using anchor tags for scrolling */}
            {navLinks.map(link => (
                <a key={link.href} href={link.href} className="nav-item" onClick={closeNavbar}>{link.text}</a>
            ))}
        </div>
      </nav>

      <div className="top-navbar">
        <h1 className="logo"><a href="#home">Portfolio</a></h1>
        <div className="nav-links">
            {/* ✨ Using anchor tags for scrolling */}
            {navLinks.map(link => (
                <a key={link.href} href={link.href} className="nav-item">{link.text}</a>
            ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;