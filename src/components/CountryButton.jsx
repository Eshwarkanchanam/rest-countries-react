import React, { useEffect, useState } from "react";
import { fetchCountryByCCA3 } from "../functions/fetchCountryByName";

const CountryButton = ({ cca3 }) => {
  let [country, setCountry] = useState(null);
  useEffect(() => {
    (async () => {
      let country = await fetchCountryByCCA3(cca3);
      setCountry(country);
    })();
  }, []);
  return (
    <button className="border-2 py-1 px-3  rounded-lg font-normal mx-1">
      {country && country.name.common}
    </button>
  );
};

export default CountryButton;
