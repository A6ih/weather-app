import "./styles.css";
import { getWeatherData } from "./apiFuncs";

function toggleCelsius(temp) {
  return (((temp - 32) * 5) / 9).toFixed(1) + "°";
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

async function getRequiredData(location) {
    const data = await getWeather(location);
    console.log(data);
}

getRequiredData("Navi Mumbai");

