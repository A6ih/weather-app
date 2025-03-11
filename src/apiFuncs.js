export async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=XGMKFAUX6HYVTUZ3FKT4X65XG`,
    );
    const result = await response.json();
    console.log(result)
    return result;
  } catch (err) {
    return "not found"
  }
}
