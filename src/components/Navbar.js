// src/components/Navbar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-lg shadow-md border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
          Blogify
        </Link>
        <div className="flex gap-6 text-white font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline text-white" : "hover:text-blue-200"
            }>
            Home
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "underline text-white" : "hover:text-blue-200"
            }>
            Blog
          </NavLink>
          <NavLink
            to="/form"
            className={({ isActive }) =>
              isActive ? "underline text-white" : "hover:text-blue-200"
            }>
            New Post
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
