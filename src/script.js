//current date, month and time

function dateTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = weekDays[time.getDay()];

  let currentDate = time.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[time.getMonth()];

  return `${day}, ${currentDate} ${currentMonth} </br></br></br> Last updated:&nbsp; ${hours}:${minutes}`;
}
let weatherDetails = document.querySelector("#date");
let time = new Date();

weatherDetails.innerHTML = dateTime(time);

//search engine

function searchForCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  citySearch(input.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchForCity);

//currentWeather and temperature details

function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector(".defaultTemp");
  showTemp.innerHTML = temperature;

  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = response.data.name;

  let feelsLike = Math.round(response.data.main.feels_like);
  let showfeelsLike = document.querySelector("#feels-like");
  showfeelsLike.innerHTML = `${feelsLike} °C`;

  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `${wind} km/h`;

  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity} %`;

  let sky = response.data.weather[0].main;
  let showSky = document.querySelector("#sky");
  showSky.innerHTML = sky;

  let description = response.data.weather[0].description;
  let showDescription = document.querySelector(".sunny");
  showDescription.innerHTML = description;

  let iconElement = document.querySelector(".img-actual");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "0a4ce0d1bdec8cde4fc9b0bad74a662a";
let units = "metric";

function citySearch(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentWeather);
}

citySearch("Warsaw");

//current location button

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let currentLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(currentLocationUrl).then(currentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

//Cities current weather

//Chicago
function showPositionChicago(position) {
  let city = "Chicago";
  let chicagoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(chicagoUrl).then(currentWeather);
}

let chicagoButton = document.querySelector("#Chicago");
chicagoButton.addEventListener("click", showPositionChicago);

//London
function showPositionLondon(position) {
  let city = "London";
  let londonUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(londonUrl).then(currentWeather);
}

let londonButton = document.querySelector("#London");
londonButton.addEventListener("click", showPositionLondon);

//Warsaw
function showPositionWarsaw(position) {
  let city = "Warsaw";
  let warsawUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(warsawUrl).then(currentWeather);
}

let warsawButton = document.querySelector("#Warsaw");
warsawButton.addEventListener("click", showPositionWarsaw);

//Tokyo
function showPositionTokyo(position) {
  let city = "Tokyo";
  let tokyoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(tokyoUrl).then(currentWeather);
}

let tokyoButton = document.querySelector("#Tokyo");
tokyoButton.addEventListener("click", showPositionTokyo);
