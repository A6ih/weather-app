import "./styles.css";
import { getWeatherData } from "./apiFuncs";
import { getLocation, renderWeather, renderExtraInfo, renderLoaderOn} from "./dom";

const form = document.querySelector("#location-form");

async function getWeather(location) {
  const allData = await getWeatherData(location);
  if (allData === "not found") {
    return allData;
  }
  const {
    conditions,
    datetime,
    feelslike,
    icon,
    temp,
    windspeed,
    humidity,
    precipprob,
    sunrise,
    sunset,
    uvindex,
    visibility,
  } = allData.currentConditions;
  const { description, resolvedAddress } = allData;
  return {
    currentConditions: {
      conditions,
      datetime,
      feelslike,
      icon,
      temp,
      windspeed,
      humidity,
      precipprob,
      sunrise,
      sunset,
      uvindex,
      visibility,
    },
    description,
    resolvedAddress,
  };
}

async function renderPage() {
  renderLoaderOn()
  const location = getLocation();
  const data = await getWeather(location);
  if (data === "not found") {
    return alert("Data about location not found");
  }
  renderWeather(
    data.currentConditions.temp,
    data.currentConditions.feelslike,
    data.currentConditions.windspeed,
    data.currentConditions.conditions,
    data.resolvedAddress,
    data.description,
    data.currentConditions.icon,
    data.currentConditions.datetime,
  );
  renderExtraInfo(
    data.currentConditions.humidity,
    data.currentConditions.precipprob,
    data.currentConditions.uvindex,
    data.currentConditions.visibility,
    data.currentConditions.sunrise,
    data.currentConditions.sunset,
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPage();
});

renderPage();
