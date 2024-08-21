import React from "react";
import CountryCard from "./CountryCard";
import ShowMessage from "./ShowMessage";

const CountryCards = ({ countries }) => {
  return (
    <section className="flex flex-wrap justify-center min-w-80 max-w-7xl mx-auto mt-10">
      {countries.length !== 0 ? (
        countries.map((country) => (
          <CountryCard country={country} key={country.id} />
        ))
      ) : (
        <ShowMessage message={"No Such Countries Found"} />
      )}
    </section>
  );
};

export default CountryCards;
