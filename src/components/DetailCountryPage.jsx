import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ThemeContext from "../contexts/ThemeContext";
import ShowMessage from "./ShowMessage";
import { Link, useParams } from "react-router-dom";
import { fetchCountryByCCA3 } from "../functions/fetchCountryByName";

const DetailCountryPage = () => {
  let theme = useContext(ThemeContext);
  let { cca3 } = useParams();

  let [isLoading, setIsLoading] = useState(true);
  let [country, setCountry] = useState(null);
  let [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let country = await fetchCountryByCCA3(cca3);
        // console.log(country);

        setCountry(country);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [cca3]);

  if (error) {
    return <ShowMessage message={"something went wrong"} />;
  }

  return isLoading ? (
    <ShowMessage message={"loading..."} />
  ) : country ? (
    <div
      className={`min-w-80 max-w-7xl mx-auto p-10 ${
        theme === "dark" && "text-white"
      }`}
    >
      <Link to={"/"}>
        <button
          className={`flex justify-center items-center py-4 px-6 border-2 rounded-lg`}
        >
          <FaArrowLeft />
          <span className="px-2">Back</span>
        </button>
      </Link>

      <section className="mt-10  sm:flex  sm:items-center">
        <div className="img-container sm:w-[50%] h-full">
          <img
            src={country.flags.png}
            alt={country.name.common + " flag"}
            className={`shadow-lg rounded w-full`}
          />
        </div>
        <section className="sm:ml-10 sm:w-[50%] ">
          <div className="country-name text-2xl sm:text-3xl font-semibold my-6">
            {country.name.common}
          </div>
          <div className="country-details md:flex justify-between">
            <div id="country-common-details" className="mb-4 ">
              <div className="country-native-name text-lg font-semibold">
                Native Name:{" "}
                <span className="font-normal">
                  {country.name.nativeName
                    ? Object.values(country.name.nativeName)[0].common
                    : "N/A"}
                </span>
              </div>
              <div id="population" className="text-lg font-semibold">
                Population :
                <span className="font-normal">{country.population}</span>
              </div>
              <div id="region" className="text-lg font-semibold">
                Region : <span className="font-normal">{country.region}</span>
              </div>
              <div id="subregion" className="text-lg font-semibold">
                Sub Region :{" "}
                <span className="font-normal">
                  {country.subregion ? country.subregion : "N/A"}
                </span>
              </div>
              <div id="capital" className="text-lg font-semibold">
                Capital :{" "}
                <span className="font-normal">
                  {country.capital ? country.capital.join(",") : "N/A"}
                </span>
              </div>
            </div>

            <div
              id="country-tld-currencies-languages-details"
              className="mb-4  md:w-[50%]"
            >
              <div id="top-level-domain" className="text-lg font-semibold">
                Top level domain :{" "}
                <span className="font-normal">{country.tld.join(",")}</span>
              </div>
              <div id="currencies" className="text-lg font-semibold">
                Currencies:{" "}
                <span className="font-normal">
                  {country.currencies
                    ? Object.keys(country.currencies).join(",")
                    : "N/A"}
                </span>
              </div>
              <div id="languages" className="text-lg font-semibold break-words">
                Languages:{" "}
                <span className="font-normal">
                  {country.languages
                    ? Object.values(country.languages).join(",")
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div id="border-countries" className="text-lg font-semibold">
            Border Countries:
            {country.borders
              ? Object.values(country.borders).map((cca3) => (
                  <Link to={`/country/${cca3}`} key={cca3}>
                    <button className="border-2 py-1 px-3  rounded-lg font-normal mx-1">
                      {cca3}
                    </button>
                  </Link>
                ))
              : "N/A"}
          </div>
        </section>
      </section>
    </div>
  ) : (
    <>
      <ShowMessage message={"No Such Country Found"} />
      <Link
        to={"/"}
        className={`flex justify-center ${theme === "dark" && "text-white"}`}
      >
        <button className="py-2 px-4 text-lg shadow-xl border-2 rounded ">
          Get Back To Home
        </button>
      </Link>
    </>
  );
};

export default DetailCountryPage;
