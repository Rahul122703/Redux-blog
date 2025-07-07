import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-lg shadow-md border-b border-white/30 m-auto max-w-[1300px] rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
          ReduxBlog
        </Link>
        <div className="flex gap-6 text-white font-semibold">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/form">New Post</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
