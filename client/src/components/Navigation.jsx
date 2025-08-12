import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/logo.png";


const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-20 flex h-24 w-full items-center justify-between bg-black px-4 font-sans shadow-md md:px-8">
        {/* Logo */}
        <NavLink to="/" onClick={closeMenu}>
          <img
            src={logo}
            alt="Portyours Logo"
            className="h-48 object-contain mb-6"
          />
        </NavLink>

        <nav className="hidden md:flex items-center gap-6 text-lg font-semibold">
          <NavLink
            to="/examples"
            className="hover:text-black-600 transition-colors text-[#FDE7A8]"
          >
            Examples
          </NavLink>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/login"
            className="font-semibold hover:text-black-600 transition-colors text-[#FDE7A8]"
          >
            Log In
          </NavLink>
          <NavLink
            to="/signup"
            className="rounded-lg px-6 py-2 font-semibold text-white transition-colors hover:bg-[#E8C255] bg-[#FDE7A8]"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile Menu Icon (only visible on small screens) */}
        <div className="md:hidden">
          <FaBars
            className="cursor-pointer text-3xl text-black transition-transform hover:scale-110"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </header>
      <div
        className={`fixed top-0 right-0 z-30 h-full w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-5">
          <FaTimes
            className="cursor-pointer text-3xl text-black transition-transform hover:scale-110"
            onClick={closeMenu}
          />
        </div>
        <nav className="flex flex-col items-center gap-6 text-lg font-semibold mt-8">
          <NavLink
            to="/features"
            onClick={closeMenu}
            className="hover:text-yellow-600"
          >
            Features
          </NavLink>
          <NavLink
            to="/examples"
            onClick={closeMenu}
            className="hover:text-yellow-600"
          >
            Examples
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={closeMenu}
            className="hover:text-yellow-600"
          >
            Pricing
          </NavLink>
          <hr className="w-3/4 my-4" />
          <NavLink
            to="/login"
            onClick={closeMenu}
            className="hover:text-yellow-600"
          >
            Log In
          </NavLink>
          <NavLink
            to="/signup"
            onClick={closeMenu}
            className="rounded-lg bg-black px-10 py-2 font-semibold text-white hover:bg-gray-800"
          >
            Sign Up
          </NavLink>
        </nav>
      </div>

      {/* Overlay: covers the rest of the page when the menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

export default Navigation;
