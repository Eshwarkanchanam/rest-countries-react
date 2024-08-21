import React, { useContext, useEffect, useState } from "react";
import { fetchAllCountries } from "../functions/fetchAllCountries";
import SearchSection from "./SearchSection";
import ShowMessage from "./ShowMessage";
import CountryCards from "./CountryCards";

const HomePage = () => {
  let [allCountries, setAllCountries] = useState([]);
  let [filteredCountries, setFilteredCountries] = useState([]);
  let [regions, setRegions] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [region, setRegion] = useState("all");
  let [isLoading, setIsLoading] = useState(true);
  let [isNetworkError, setIsNetworkError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let allCountries = await fetchAllCountries();
        setAllCountries(allCountries);
        setFilteredCountries(allCountries);
        setRegions(
          allCountries.reduce(
            (regions, country) => {
              if (!regions.includes(country.region)) {
                regions.push(country.region);
              }
              return regions;
            },
            ["all"]
          )
        );
        setIsLoading(false);
        setIsNetworkError(false);
      } catch (error) {
        setIsNetworkError(true);
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    setFilteredCountries(filterCountriesBy(searchValue, region));
  }, [searchValue, region]);

  function filterCountriesBy(searchValue, region) {
    return allCountries.filter(
      (country) =>
        country.name.common.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 &&
        (region === "all" ||
          region.toLowerCase() === country.region.toLowerCase())
    );
  }

  return (
    <div>
      <SearchSection
        regions={regions}
        region={region}
        setRegion={setRegion}
        setSearchValue={setSearchValue}
      />
      {isNetworkError ? (
        <ShowMessage message={"no internet"} />
      ) : isLoading ? (
        <ShowMessage message={"loading..."} />
      ) : (
        <CountryCards countries={filteredCountries} />
      )}
    </div>
  );
};

export default HomePage;
