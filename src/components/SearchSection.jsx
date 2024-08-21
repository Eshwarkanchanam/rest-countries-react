import React, { useContext } from "react";
import FilterBy from "./FilterBy";
import ThemeContext from "../contexts/ThemeContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SortSection from "./SortSection";

const SearchSection = ({
  regions,
  region,
  setRegion,

  subRegions,
  subRegion,
  setSubRegion,

  setSearchValue,

  sortCriteria,
  setSortCriteria,
}) => {
  let theme = useContext(ThemeContext);
  console.log(regions);

  return (
    <section
      className={`search-filter-section min-w-80 max-w-7xl mx-auto sm:flex sm:justify-between mt-4 "
      `}
    >
      <div
        id="search-container"
        className={`shadow-lg py-2 px-2 m-4 rounded-lg flex items-center justify-evenly  ${
          theme === "dark" && "bg-slate-800 text-white"
        } `}
      >
        <FaMagnifyingGlass className="mx-2" />
        <input
          type="text"
          className={`outline-none m-2 ${theme === "dark" && "bg-slate-800"}`}
          placeholder="Search for country..."
          id="search-input"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <FilterBy
        filterName={"filter by region"}
        lists={regions}
        item={region}
        set={setRegion}
        zIndex={"z-50"}
      />
      <FilterBy
        filterName={"filter by subregion"}
        lists={subRegions}
        item={subRegion}
        set={setSubRegion}
        zIndex={"z-40"}
      />
      <SortSection
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
    </section>
  );
};

export default SearchSection;
