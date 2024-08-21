import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav
      className={`shadow-lg ${theme === "dark" && "bg-slate-800 text-white"}`}
    >
      <header className="min-w-80 max-w-7xl mx-auto flex justify-between py-6 p-4">
        <h1 className="text-xl font-sans font-bold">Where in the world?</h1>
        <button
          id="theme-button"
          onClick={() => {
            setTheme((prevTheme) => {
              if (prevTheme === "light") {
                return "dark";
              } else {
                return "light";
              }
            });
          }}
          className="capitalize hover:font-semibold flex items-center"
        >
          {theme !== "dark" ? <FaSun /> : <FaMoon />} 
          <span className="ml-1"> {theme} mode</span>
        </button>
      </header>
    </nav>
  );
};

export default Navbar;
