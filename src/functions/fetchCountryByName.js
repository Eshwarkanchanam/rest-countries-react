export async function fetchCountryByCCA3(cca3) {
  let URL_FOR_COUNTRY = `https://restcountries.com/v3.1/alpha/${cca3}`;
  let response = await fetch(URL_FOR_COUNTRY);
  let country = await response.json();
  return country[0];
}
