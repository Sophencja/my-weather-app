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
  celciusTemperature = response.data.main.temp;

  let temperature = Math.round(celciusTemperature);
  let showTemp = document.querySelector(".defaultTemp");
  showTemp.innerHTML = temperature;

  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = response.data.name;

  feelsLikeTemperature = response.data.main.feels_like;

  let feelsLike = Math.round(feelsLikeTemperature);
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

// conversion to farenheit and celsius

function showFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".defaultTemp");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".defaultTemp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let farenheitLink = document.querySelector("#fahrenheit");
farenheitLink.addEventListener("click", showFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// conversion to farenheit and celsius for "feels like"

function showFarenheitTemperatureDetails(event) {
  event.preventDefault();
  let temperatureElementDetails = document.querySelector("#feels-like");
  let farenheitTemperatureDetails = (feelsLikeTemperature * 9) / 5 + 32;
  temperatureElementDetails.innerHTML = `${Math.round(
    farenheitTemperatureDetails
  )} °F`;
}

let farenheitLinkdetails = document.querySelector("#fahrenheit");
farenheitLinkdetails.addEventListener("click", showFarenheitTemperatureDetails);

function showCelsiusTemperatureDetails(event) {
  event.preventDefault();
  let temperatureElementDetails = document.querySelector("#feels-like");
  let celsiusTemperatureDetails = feelsLikeTemperature;
  temperatureElementDetails.innerHTML = `${Math.round(
    celsiusTemperatureDetails
  )} °C`;
}

let celsiusLinkdetails = document.querySelector("#celsius");
celsiusLinkdetails.addEventListener("click", showCelsiusTemperatureDetails);

//current location button

function showPosition(position) {
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
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
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let city = "Chicago";
  let chicagoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(chicagoUrl).then(currentWeather);
}

let chicagoButton = document.querySelector("#Chicago");
chicagoButton.addEventListener("click", showPositionChicago);

//London
function showPositionLondon(position) {
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let city = "London";
  let londonUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(londonUrl).then(currentWeather);
}

let londonButton = document.querySelector("#London");
londonButton.addEventListener("click", showPositionLondon);

//Warsaw
function showPositionWarsaw(position) {
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let city = "Warsaw";
  let warsawUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(warsawUrl).then(currentWeather);
}

let warsawButton = document.querySelector("#Warsaw");
warsawButton.addEventListener("click", showPositionWarsaw);

//Tokyo
function showPositionTokyo(position) {
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let city = "Tokyo";
  let tokyoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(tokyoUrl).then(currentWeather);
}

let tokyoButton = document.querySelector("#Tokyo");
tokyoButton.addEventListener("click", showPositionTokyo);
