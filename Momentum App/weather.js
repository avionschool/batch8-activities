const COORDS = "coords";
const API_KEY = "ed7e7c4746449efa380d6436776436c1";
const weatherContainer = document.querySelector(".js-weather");

function paintWeather(weather, temperature, location) {
  const weatherMain = weatherContainer.querySelector(".weather-main");
  const weatherTemp = weatherContainer.querySelector(".weather-temp");
  const weatherLocation = weatherContainer.querySelector(".weather-location");
  weatherMain.innerHTML = `${weather}`;
  weatherTemp.innerHTML = `${temperature}`;
  weatherLocation.innerHTML = `${location}`;
}

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log(json);
      const weather = json.weather[0].main;
      const temperature = json.main.temp;
      const location = json.name;
      paintWeather(weather, temperature, location);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
  console.log("Geo Success!");
}

function handleGeoError() {
  console.log("Can't access the geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS)
  if (loadedCoords === null){
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();