import "./styles.css";
import { getWeatherData } from "./apiFuncs";
import { getLocation, renderTemp } from "./dom";

const form = document.querySelector("#location-form");

function toggleCelsius(temp) {
  return (((temp - 32) * 5) / 9).toFixed(1);
}

async function getWeather(location) {
  const allData = await getWeatherData(location);
  const { conditions, datetime, feelslike, icon, temp } =
    allData.currentConditions;
  const { description, resolvedAddress } = allData;
  return {
    currentConditions: { conditions, datetime, feelslike, icon, temp },
    description,
    city: resolvedAddress.split(",")[0],
  };
}


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const location = getLocation();
  const data = await getWeather(location);
  renderTemp(toggleCelsius(data.currentConditions.temp), toggleCelsius(data.currentConditions.feelslike));
});
