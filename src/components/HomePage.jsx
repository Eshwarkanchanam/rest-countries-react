import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchAllCountries } from "../functions/fetchAllCountries";
import SearchSection from "./SearchSection";
import ShowMessage from "./ShowMessage";
import CountryCards from "./CountryCards";

const HomePage = () => {
  let [allCountries, setAllCountries] = useState([]);
  let [filteredCountries, setFilteredCountries] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [regions, setRegions] = useState([]);
  let [region, setRegion] = useState("all");
  let [subRegions, setSubRegions] = useState([]);
  let [subRegion, setSubRegion] = useState("all");
  let [sortCriteria, setSortCriteria] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let [isNetworkError, setIsNetworkError] = useState(false);
  let regionsRef = useRef(null);
  useEffect(() => {
    (async () => {
      try {
        let allCountries = await fetchAllCountries();
        setAllCountries(allCountries);
        setFilteredCountries(allCountries);
        regionsRef.current = getRegions();

        function getRegions() {
          return allCountries.reduce(
            (regions, country) => {
              if (regions[country.region] === undefined) {
                regions[country.region] = ["all"];
              }
              if (
                country.subregion &&
                !regions[country.region].includes(country.subregion)
              ) {
                regions[country.region].push(country.subregion);
              }
              if (!regions.allRegions.includes(country.region)) {
                regions.allRegions.push(country.region);
              }
              if (
                country.subregion &&
                !regions.allSubregions.includes(country.subregion)
              ) {
                regions.allSubregions.push(country.subregion);
              }
              return regions;
            },
            {
              allRegions: ["all"],
              allSubregions: ["all"],
            }
          );
        }

        setRegions(regionsRef.current.allRegions);
        setSubRegions(regionsRef.current.allSubregions);

        setIsLoading(false);
        setIsNetworkError(false);
      } catch (error) {
        setIsNetworkError(true);
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    let filteredCountries = filterCountriesBy(searchValue, region, subRegion);

    if (sortCriteria) {
      filteredCountries = filteredCountries.sort((a, b) => {
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

    setFilteredCountries(filteredCountries);

    if (regionsRef.current) {
      setSubRegions(
        region === "all"
          ? regionsRef.current.allSubregions
          : regionsRef.current[region]
      );
    }
  }, [searchValue, region, subRegion, sortCriteria]);

  useEffect(()=>{
    setSubRegion('all');
  },[region])

  function filterCountriesBy(searchValue, region, subRegion) {
    return allCountries.filter(
      (country) =>
        country.name.common.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 &&
        (region === "all" ||
          region.toLowerCase() === country.region.toLowerCase()) &&
        (subRegion === "all" ||
          (country.subregion &&
            country.subregion.toLowerCase() === subRegion.toLowerCase()))
    );
  }

  return (
    <div>
      <SearchSection
        regions={regions}
        region={region}
        setRegion={setRegion}
        subRegions={subRegions}
        subRegion={subRegion}
        setSubRegion={setSubRegion}
        setSearchValue={setSearchValue}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
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
