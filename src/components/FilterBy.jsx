import React, { useContext, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const FilterBy = ({
  filterName,
  lists = [],
  item,
  zIndex,
  handleFilter,
}) => {
  let theme = useContext(ThemeContext);
  let [showList, setShowList] = useState(false);
  // console.log(regions,region);

  return (
    <div
      className={`sm:flex sm:justify-end relative ${zIndex}`}
      onClick={(e) => {
        setShowList((prevState) => !prevState);
        // if (e.target.closest("li")) {
        //   set(e.target.closest("li").textContent);
        // }
        handleFilter(e);
      }}
    >
      <div
        id="filter-container-region"
        className={`shadow-lg py-4 text-lg m-4 rounded-lg flex justify-between items-center relative z-50 ${
          theme === "dark" && "bg-slate-800 text-white"
        }`}
      >
        <span className="mr-4 px-8 capitalize">
          {item === "all" ? filterName : item}
        </span>
        <span className="mr-4">
          {!showList ? <FaAngleDown /> : <FaAngleUp />}
        </span>

        {showList && (
          <ul
            className={`absolute left-0 top-16 bg-white rounded-lg w-full text-center shadow-lg ${
              theme === "dark" && "bg-slate-800 text-white border-0"
            }`}
          >
            {Array.from(lists).map((item, index) => (
              <li
                className={`hover:font-bold py-4 cursor-pointer ${
                  theme === "dark" && "bg-slate-800 border-0"
                }`}
                key={index}
              >
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
