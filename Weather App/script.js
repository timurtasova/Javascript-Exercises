"use strict";


// Event: Listeners
document.querySelector("#location-btn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(positionFn, errorFn);
});
const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", () => {
    const input = document.querySelector("#input");
    if(input.value.trim() < 1){
        alert("please enter a city");
    }
    else {
        cityWeather(input.value.toLowerCase());
    }
});
document.querySelector("#input").addEventListener("keypress", (e) => e.key == "Enter" ? submitBtn.click() : e.key);
document.querySelector("#back-btn").addEventListener("click", () => {
    document.querySelector("#weather-card").classList.add("d-none");
    document.querySelector("#select-city").classList.remove("d-none");
})


// Get position and send to weather displayer function {cityWeather}
async function positionFn(position) {
    try {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const location = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=e356e66175b74beebac73e2c782719b4`);
        if(!location.ok)
            throw new Error("Location information");
        const getCoords = await location.json();
        const getCityName = await getCoords.results[0].components.province;
        cityWeather(getCityName);
    }
    catch(err) {
        errorFn(err);
    }

}

// Weather Card
async function cityWeather(cityName){
    try {
        const weatherLink = await fetch(`https://api.weatherapi.com/v1/current.json?key=a5a4a229fef94d3584d45226233003&q=${cityName}&aqi=yes`);
        if(!weatherLink.ok)
            throw new Error("City not Found");
        const data = await weatherLink.json();
        console.log(data);
        document.querySelector("#weather-card").classList.remove("d-none");
        document.querySelector("#select-city").classList.add("d-none");
        document.querySelector("#city-name").textContent = data.location.name + ", " + data.location.country;
        document.querySelector("#city-time").textContent = data.current.last_updated;
        document.querySelector("#weather-icon").innerHTML = `<img src="https:${data.current.condition.icon}">`;
        document.querySelector("#temperature"). textContent = `${data.current.temp_c}°C`;
        document.querySelector("#weather-status").textContent = data.current.condition.text;
        document.querySelector("#wind").textContent = `${data.current.wind_kph} km/h`;
        document.querySelector("#cloud").textContent = `${data.current.cloud}%`;
        document.querySelector("#humidity").textContent = `${data.current.humidity}%`;
    }
    catch(err) {
        errorFn(err);
    }
}

// If location or input value is wrong, it will show a alert 
function errorFn(err) {
    let alert = document.querySelector(".alert");
    alert.classList.remove("d-none");
    alert.textContent = err;
    setTimeout(() => alert.classList.add("d-none"), 2000);
}
