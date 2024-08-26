import React, { useContext, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";

const FilterBy = ({ lists = [], item, handleFilter }) => {
  let theme = useContext(ThemeContext);

  return (
    <>
      <select
        onChange={handleFilter}
        className={`rounded-lg shadow-lg px-4 text-xl pl-4 w-[90%] md:w-min ml-5  ${
          theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
        }`}
        value={item}
      >
        <option value="all">Filter by region</option>
        {Array.from(lists).map((region) => (
          <option value={region} key={region}>{region}</option>
        ))}
      </select>
    </>
  );
};

export default FilterBy;
