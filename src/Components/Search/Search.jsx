import { useState } from "react";

const Search = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`p-4 overflow-hidden ${isExpanded ? "w-[220px]" : "w-[46px]"} h-[42px] bg-gradient-to-r from-green-600 via-emerald-500 to-teal-900 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex items-center transition-all duration-300`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center  fill-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="15"
          height="16"
        >
          <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
        </svg>
      </div>
      {isExpanded && (
        <input
          type="text"
          className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
          autoFocus
        />
      )}
    </div>
  );
};

export default Search;
