const location = document.querySelector("#location-input");
const tempDisplay = document.querySelector("#temp-display");
const feelslikeDisplay = document.querySelector("#feelslike-display");
const cityDisplay = document.querySelector("#city-display");
const conditionDisplay = document.querySelector("#condition-display");
const descriptionDisplay = document.querySelector("#description-display");
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
  document.querySelector("#unit-container").style.display = "block";
}

export function renderWeather(
  temp,
  feelslike,
  condition,
  city,
  description,
  icon,
) {
  renderTemp(temp, feelslike);
  cityDisplay.textContent = city;
  conditionDisplay.textContent = condition;
  descriptionDisplay.textContent = description;
  document.querySelector("#icon-container").style.display = "block";
  import(`./images/${icon}.svg`).then(
    ({ default: image }) => (document.querySelector("img").src = image),
  );
}
