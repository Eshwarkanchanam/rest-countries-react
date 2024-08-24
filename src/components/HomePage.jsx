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
  let [isNetworkError, setIsNetworkError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let allCountries = await fetchAllCountries();
        setAllCountries(allCountries);
        setIsLoading(false);
        setIsNetworkError(false);
      } catch (error) {
        setIsNetworkError(true);
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
    if (e.target.closest("li")) {
      console.log(e.target.closest("li").textContent);
      
      setRegion(e.target.closest("li").textContent);
      setSubRegion("all");
    }
  }
  
  function handleSubRegion(e) {
    if (e.target.closest("li")) {
      setSubRegion(e.target.closest("li").textContent);
    }
  }
  
  let regions = allCountries.reduce((regions, country) => {
    regions.add(country.region);
    return regions;
  }, new Set(["all"]));
  
  let subRegions = getSubRegionsByRegion();
  
  let filteredCountries = filterCountriesBy(searchValue, region, subRegion);
  
  function getSubRegionsByRegion() {
    return allCountries.reduce((subRegions, country) => {
      if (
        country.subregion &&
        (region === "all" || region.toLowerCase() === country.region.toLowerCase())
      ) {
        subRegions.add(country.subregion);
      }
      return subRegions;
    }, new Set(["all"]));
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
