import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/sheet.png"; // Update with your actual logo path

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 py-4 px-6 flex items-center justify-between">
      {/* Left: Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="h-12" /> {/* Adjust height as needed */}
      </Link>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/getting-started" className="text-white font-medium hover:text-gray-300 mx-6">
          Getting Started
        </Link>
        <Link to="/plans" className="text-white font-medium hover:text-gray-300">
          Plans
        </Link>
        <Link to="/about" className="text-white font-medium hover:text-gray-300 mx-6">
          About Us
        </Link>
      </div>

      {/* Right: Sign Up & Login */}
      <div className="flex items-center space-x-4">
        <Link to="/signup" className="text-white font-medium hover:text-gray-300">
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
