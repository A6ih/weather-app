const location = document.querySelector("#location-input");
const tempDisplay = document.querySelector("#temp-display");
const feelslikeDisplay = document.querySelector("#feelslike-display");
const cityDisplay = document.querySelector("#city-display");
let activeUnit = 'celsius';

export function getLocation() {
    console.log(location.value)
    return location.value
}

export function renderTemp(temp, feelslike) {
    tempDisplay.textContent = temp;
    feelslikeDisplay.textContent = "Feels like " + feelslike
}

export function renderWeather(temp, feelslike, city) {
    renderTemp(temp, feelslike);
    cityDisplay.textContent = city;
}

