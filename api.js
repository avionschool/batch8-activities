// to see documentation, visit "https://openweathermap.org/"
// used '&units=metric' to change to celsius
// API key = e9fda0468ea526972a52690dd74ea091

let inputValue = document.getElementById('inputValue');
let checkWeatherButton = document.getElementById('checkWeatherButton');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let tempMinMax = document.getElementById('tempMinMax');
let weatherDes = document.getElementById('weatherDes');
// let icon = document.getElementById('icon');

checkWeatherButton.addEventListener('click', function(name) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=metric&appid=e9fda0468ea526972a52690dd74ea091')
    .then(response => response.json())
    .then(data => {
    let cityValue = data['name'];
    let tempValue = data['main']['temp'];
    let minTempValue = data['main']['temp_min'];
    let maxTempValue = data['main']['temp_max'];
    let weatherDesValue = data['weather'][0]['description'];
    let icon = data['weather'][0]['icon'];

    let iconValue = ('http://openweathermap.org/img/wn/icon@2x.png');

    city.innerHTML = cityValue;
    temperature.innerHTML = tempValue + "&#176";
    tempMinMax.innerHTML = "Minimum temperature outside is " + minTempValue + "&#176" + " and max is " + maxTempValue + "&#176";
    weatherDes.innerHTML = weatherDesValue + iconValue;
    inputValue.value = "";
})

.catch(err => alert("Error: City name does not exist."));
})

//fetch('https://api.openweathermap.org/data/2.5/weather?q=Pasig&appid=e9fda0468ea526972a52690dd74ea091')
// {
//     "coord": {
//         "lon":121.065,
//         "lat":14.587
//     },

//     "weather": [
//         {
//             "id":802,
//             "main":"Clouds",
//             "description":"scattered clouds",
//             "icon":"03d"
//         }
//     ],

//     "base": "stations",

//     "main": {
//         "temp":306.47,
//         "feels_like":312.75,
//         "temp_min":305.99,
//         "temp_max":307.37,
//         "pressure":1010,
//         "humidity":58
//     },

//     "visibility": 10000,
    
//     "wind": {
//         "speed":5.14,
//         "deg":270
//     },

//     "clouds": {
//         "all":40
//     },

//     "dt": 1623904625,

//     "sys": {
//         "type":1,
//         "id":8160,
//         "country":"PH",
//         "sunrise":1623878822,
//         "sunset":1623925574
//     },

//     "timezone" :28800,

//     "id":1694579,
    
//     "name":"Pasig",

//     "cod":200
// }