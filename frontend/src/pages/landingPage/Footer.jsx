import React from "react";
import Squares from "./SquaresBg";
import CircularText from "./CircularText";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative w-full h-60 bg-black overflow-hidden flex items-center justify-center px-10">
      {/* Background Squares */}
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="rgb(34, 34, 34)"
        hoverFillColor="rgb(34, 34, 34)"
        className="absolute inset-0"
      />

      {/* Footer Content */}
      <div className="relative w-full max-w-screen-lg grid grid-cols-3 items-center text-white">
        {/* Left Section - Navbar Links */}
        <div className="flex flex-col space-y-2">
          <Link to="/getting-started" className="hover:text-gray-300">
            Getting Started
          </Link>
          <Link to="/plans" className="hover:text-gray-300">
            Plans
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About Us
          </Link>
        </div>

        {/* Center - Rotating Circular Text */}
        <div className="flex justify-center">
          <CircularText
            text="NIRMAN*GATI*NIRMAN*"
            onHover="speedUp"
            spinDuration={20}
            className="w-24 h-24"
          />
        </div>

        {/* Right Section - Customer Support */}
        <div className="flex flex-col space-y-2 text-right">
          <p>Email: support@example.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Mon-Fri: 9 AM - 6 PM</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
