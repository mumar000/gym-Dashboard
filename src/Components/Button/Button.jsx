import React from "react";
import { Link } from 'react-router-dom';

const Button = ({ buttonTitle, link, onClick }) => {
  return (
    <div className="relative group">
      <Link to={link}>
        <button
          onClick={onClick}
          className="relative inline-block p-px font-semibold leading-6 text-white shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          {/* Gradient Border */}
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-300 via-green-600 to-green-800 p-[2px] opacity-100 transition-opacity duration-500"></span>

          {/* Button Content */}
          <span className="relative block px-2 py-2 md:px-6 md:py-2 rounded-xl bg-black/50 backdrop-blur-sm">
            <div className="relative flex items-center space-x-2">
              <span className="text-sm md:text-base transition-all duration-500 ">
                {buttonTitle}
              </span>
              <svg
                className="w-4 h-4 md:w-6 md:h-6 transition-transform duration-500 group-hover:translate-x-1"
                data-slot="icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Button;