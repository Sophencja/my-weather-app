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

  return `${day}, ${currentDate} ${currentMonth} </br></br></br> ${hours}:${minutes}`;
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

//New York
function showPositionNewYork(position) {
  let city = "New York";
  let newYorkUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(newYorkUrl).then(currentWeather);
}

let newYorkButton = document.querySelector("#New-York");
newYorkButton.addEventListener("click", showPositionNewYork);

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

//Hong Kong
function showPositionHongKong(position) {
  let city = "Hong Kong";
  let hongKongUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(hongKongUrl).then(currentWeather);
}

let hongKongButton = document.querySelector("#Hong-Kong");
hongKongButton.addEventListener("click", showPositionHongKong);
