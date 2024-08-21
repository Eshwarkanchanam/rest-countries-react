import React, { useContext, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const FilterBy = ({ filterName, regions = [], region, setRegion, icon }) => {
  let theme = useContext(ThemeContext);
  let [showList, setShowList] = useState(false);
  return (
    <div
      className="sm:flex sm:justify-end relative"
      onClick={(e) => {
        setShowList((prevState) => !prevState);
        if (e.target.closest("li")) {
          setRegion(e.target.closest("li").textContent);
        }
      }}
    >
      <div
        id="filter-container-region"
        className={`shadow-lg py-4 text-lg m-4 rounded-lg flex justify-between items-center relative z-50 ${
          theme === "dark" && "bg-slate-800 text-white"
        }`}
      >
        <span className="mr-4 px-8 capitalize">
          {region === "all" ? filterName : region}
        </span>
        <span className="mr-4">
          {!showList ? <FaAngleDown /> : <FaAngleUp />}
        </span>

        {showList && (
          <ul
            className={`absolute left-0 top-16 bg-white rounded-lg w-full text-center border-2 ${
              theme === "dark" && "bg-slate-800 text-white border-0"
            }`}
          >
            {regions.map((item, index) => (
              <li className="hover:font-bold py-4 cursor-pointer" key={index}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterBy;
