import React from "react";
import { Link } from 'react-router-dom';

const Button = ({ buttonTitle, link, onClick, icon }) => {
  return (
    <div className="relative group">
      <Link to={link}>
        <button
          onClick={onClick}
          className="relative inline-block p-px font-semibold leading-6 text-white shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          {/* Gradient Border */}
          <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime-400 via-emerald-300 to-teal-900 p-[2px] opacity-100 transition-opacity duration-500"></span>

          {/* Button Content */}
          <span className="relative block px-2 py-2 md:px-6 md:py-2 rounded-xl bg-black/50 backdrop-blur-sm">
            <div className="relative flex items-center space-x-2">
              <span className="text-sm md:text-base transition-all duration-500 ">
                {buttonTitle}
              </span>
              {icon}
            </div>
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Button;