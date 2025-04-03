import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav fixed top-0 left-0 w-full bg-[#0f0e0e] px-4 sm:px-10 md:px-16 lg:px-24 h-[70px] flex items-center justify-between z-50 shadow-md">
      {/* Logo */}
      <Link to="/home">
        <b className="heading text-white text-lg sm:text-xl md:text-2xl">
          ez-Snippits
        </b>
      </Link>

      {/* Logout Button */}
      <div className="links">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="btnNormal bg-red-500 text-white hover:bg-red-600 px-4 sm:px-6 py-2 rounded-md transition-all"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
