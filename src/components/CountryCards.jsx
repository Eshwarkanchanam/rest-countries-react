import React from "react";
import CountryCard from "./CountryCard";
import ShowMessage from "./ShowMessage";
import { Link } from "react-router-dom";

const CountryCards = ({ countries }) => {
  return (
    <section className="flex flex-wrap justify-center min-w-80 max-w-7xl mx-auto mt-10">
      {countries.length !== 0 ? (
        countries.map((country) => (
          <Link to={`/country/${country.cca3}`} key={country.cca3}>
            <CountryCard country={country}  />
          </Link>
        ))
      ) : (
        <ShowMessage message={"No Such Countries Found"} />
      )}
    </section>
  );
};

export default CountryCards;
