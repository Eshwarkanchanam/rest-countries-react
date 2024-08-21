import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const CountryCard = ({ country }) => {
  let theme = useContext(ThemeContext);
  return (
    <div
      className={`country-card rounded-lg w-72 shadow-xl hover:scale-105 mx-auto my-4 sm:mx-4  ${
        theme === "dark" && "bg-slate-800 text-white"
      }`}
    >
      <div
        className={`img-container w-full h-52 border-2 rounded-lg ${
          theme === "dark" && "border-0"
        }`}
      >
        <img
          src={country.flags.png}
          alt={`${country.name.common}`}
          className="h-full w-full rounded-r-lg rounded-l-lg"
        />
      </div>
      <div className="country-card-content pl-6 pb-2">
        <h2 className="card-heading text-xl font-semibold my-4">
          {country.name.common}
        </h2>
        <div className="country-card-details mb-8 ">
          <div className="text-lg font-medium my-1">
            Population :{" "}
            <span className="text-base font-normal">{country.population}</span>
          </div>
          <div className="text-lg font-medium my-1">
            Region:{" "}
            <span className="text-base font-normal">{country.region}</span>
          </div>
          <div className="text-lg font-medium my-1">
            Capital:{" "}
            <span className="text-base font-normal">
              {country.capital && country.capital.join(",")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
