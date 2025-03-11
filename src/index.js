import "./styles.css";
import { getWeatherData } from "./apiFuncs";
import { getLocation, renderWeather } from "./dom";

const form = document.querySelector("#location-form");

async function getWeather(location) {
  const allData = await getWeatherData(location);
  if (allData === "not found") {
    return allData;
  }
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
  if (data === "not found") {
    return alert("Data about location not found")
  }
  renderWeather(
    data.currentConditions.temp,
    data.currentConditions.feelslike,
    data.currentConditions.conditions,
    data.city,
    data.description,
    data.currentConditions.icon,
  );
});
