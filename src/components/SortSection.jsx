import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const Sort = ({ sortCriteria, setSortCriteria, handleFilter }) => {
  const theme = useContext(ThemeContext);

  return (
    <select
      className={`rounded-lg shadow-lg px-4 text-xl pl-4 w-[90%] md:w-min ml-5  ${
        theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
      }`}
      value={sortCriteria}
      onChange={(e) => {
        setSortCriteria(e.target.value);
      }}
    >
      <option value="">Sort By</option>
      <option value="Ascending Population">Ascending Population</option>
      <option value="Descending Population">Descending Population</option>
      <option value="Ascending Area">Ascending Area</option>
      <option value="Descending Area">Descending Area</option>
    </select>
  );
};

export default Sort;
