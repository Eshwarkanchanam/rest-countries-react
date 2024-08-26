import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchAllCountries } from "../functions/fetchAllCountries";
import SearchSection from "./SearchSection";
import ShowMessage from "./ShowMessage";
import CountryCards from "./CountryCards";

const HomePage = () => {
  let [allCountries, setAllCountries] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [region, setRegion] = useState("all");
  let [subRegion, setSubRegion] = useState("all");
  let [sortCriteria, setSortCriteria] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let allCountries = await fetchAllCountries();
        setAllCountries(allCountries);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  function handleSearch(e) {
    setSearchValue(e.target.value.trim());
  }

  function handleRegion(e) {
    setRegion(e.target.value);
    setSubRegion("all");
  }

  function handleSubRegion(e) {
    setSubRegion(e.target.value);
  }

  let regions = allCountries.reduce((regions, country) => {
    regions.add(country.region);
    return regions;
  }, new Set([]));

  let subRegions = getSubRegionsByRegion();

  let filteredCountries = filterCountriesBy(searchValue, region, subRegion);

  function getSubRegionsByRegion() {
    return allCountries.reduce((subRegions, country) => {
      if (
        country.subregion &&
        (region === "all" ||
          region.toLowerCase() === country.region.toLowerCase())
      ) {
        subRegions.add(country.subregion);
      }
      return subRegions;
    }, new Set([]));
  }

  function filterCountriesBy(searchValue, region, subRegion) {
    return allCountries
      .filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .indexOf(searchValue.toLowerCase()) !== -1 &&
          (region === "all" ||
            region.toLowerCase() === country.region.toLowerCase()) &&
          (subRegion === "all" ||
            (country.subregion &&
              country.subregion.toLowerCase() === subRegion.toLowerCase()))
      )
      .sort((a, b) => {
        switch (sortCriteria) {
          case "Ascending Population":
            return a.population - b.population;
          case "Descending Population":
            return b.population - a.population;
          case "Ascending Area":
            return a.area - b.area;
          case "Descending Area":
            return b.area - a.area;
          default:
            return 0;
        }
      });
  }

  return (
    <div>
      <SearchSection
        region={region}
        regions={regions}
        subRegion={subRegion}
        subRegions={subRegions}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        handleSearch={handleSearch}
        handleRegion={handleRegion}
        handleSubRegion={handleSubRegion}
      />
      {isError ? (
        <ShowMessage message={"something went wrong"} />
      ) : isLoading ? (
        <ShowMessage message={"loading..."} />
      ) : (
        <CountryCards countries={filteredCountries} />
      )}
    </div>
  );
};

export default HomePage;
