let URL_FOR_COUNTRIES = "https://restcountries.com/v3.1/all";

export async function fetchAllCountries() {
  let response = await fetch(URL_FOR_COUNTRIES);
  let allCountries = await response.json();
  return allCountries;
}
