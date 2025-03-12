import formatTime from "./formatTime";

const location = document.querySelector("#location-input");
const tempDisplay = document.querySelector("#temp-display");
const feelslikeDisplay = document.querySelector("#feelslike-display");
const celsiusBtn = document.querySelector("#celsius-btn");
const fahrenheitBtn = document.querySelector("#fahrenheit-btn");
let activeUnit = "celsius";
let tempFahrenheit;
let feelsLikeFahrenheit;

celsiusBtn.addEventListener("click", () => {
  activeUnit = "celsius";
  changeUnit();
});

fahrenheitBtn.addEventListener("click", () => {
  activeUnit = "fahrenheit";
  changeUnit();
});

function changeUnit() {
  if (activeUnit === "celsius") {
    tempDisplay.textContent = (((+tempFahrenheit - 32) * 5) / 9).toFixed(1);
    feelslikeDisplay.textContent =
      "Feels like " + (((+feelsLikeFahrenheit - 32) * 5) / 9).toFixed(1) + "°C";
    celsiusBtn.style.color = "var(--active-btn)";
    fahrenheitBtn.style.color = "var(--inactive-btn";
  } else {
    tempDisplay.textContent = tempFahrenheit.toFixed(1);
    feelslikeDisplay.textContent =
      "Feels like " + feelsLikeFahrenheit.toFixed(1) + "°F";
    celsiusBtn.style.color = "var(--inactive-btn)";
    fahrenheitBtn.style.color = "var(--active-btn";
  }
}

export function getLocation() {
  if (location.value === "") {
    location.value = "Kuopio";
  }
  return location.value;
}

export function renderTemp(temp, feelslike) {
  tempFahrenheit = temp;
  feelsLikeFahrenheit = feelslike;
  tempDisplay.textContent = temp.toFixed(1);
  feelslikeDisplay.textContent = feelslike.toFixed(1);
  changeUnit();
  document.querySelector("#unit-container").style.display = "block";
}

function renderInfo(city, condition, description, time, windspeed) {
  document.querySelector("#city-display").textContent = city;
  document.querySelector("#condition-display").textContent = condition;
  document.querySelector("#description-display").textContent = description;
  document.querySelector("#time-display").textContent =
    `As of ${formatTime(time)} (local time)`;
  document.querySelector("#windspeed-display").textContent =
    `Wind: ${windspeed} m/s`;
  document.querySelector("#wind-container").style.display = "flex";
}

function renderIcon(icon) {
  document.querySelector("#icon-container").style.display = "block";
  import(`./images/${icon}.svg`).then(
    ({ default: image }) =>
      (document.querySelector("#weather-icon").src = image),
  );
  document.querySelector("img").alt = icon;
}

export function renderWeather(
  temp,
  feelslike,
  windspeed,
  condition,
  city,
  description,
  icon,
  time,
) {
  document.querySelector("body").style.background = `var(--${icon})`;
  renderTemp(temp, feelslike);
  renderInfo(city, condition, description, time, windspeed);
  renderIcon(icon);
}

export function renderExtraInfo(
  humidity,
  precip,
  uvindex,
  visibility,
  sunrise,
  sunset,
) {
  document.querySelector("#humidity").textContent = humidity;
  document.querySelector("#precip").textContent = precip;
  document.querySelector("#uv-index").textContent = uvindex;
  document.querySelector("#visibility").textContent = visibility;
  document.querySelector("#sunrise").textContent = formatTime(sunrise);
  document.querySelector("#sunset").textContent = formatTime(sunset);
  document.querySelector("#extra-info-container").style.display = "flex"
}
