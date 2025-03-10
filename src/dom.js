const location = document.querySelector("#location-input");
const tempDisplay = document.querySelector("#temp-display");
const feelslikeDisplay = document.querySelector("#feelslike-display");
const cityDisplay = document.querySelector("#city-display");
let activeUnit = "celsius";

export function getLocation() {
  console.log(location.value);
  return location.value;
}

export function renderTemp(temp, feelslike) {
  if ((activeUnit = "celsius")) {
    tempDisplay.textContent = (((temp - 32) * 5) / 9).toFixed(1);
    feelslikeDisplay.textContent =
      "Feels like " + (((feelslike - 32) * 5) / 9).toFixed(1) + "°C";
  } else {
    tempDisplay.textContent = temp.toFixed(1);
    feelslikeDisplay.textContent = "Feels like " + feelslike.toFixed(1) + "°C";
  }
}

export function renderWeather(temp, feelslike, city) {
  renderTemp(temp, feelslike);
  cityDisplay.textContent = city;
}
