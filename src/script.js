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
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  event.preventDefault();
  let input = document.querySelector("#city-input");
  citySearch(input.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchForCity);

//currentWeather and temperature details

function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function currentWeather(response) {
  celciusTemperature = response.data.main.temp;

  let showTemp = document.querySelector(".defaultTemp");
  showTemp.innerHTML = Math.round(response.data.main.temp);

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

function displayForecast(response) {
  let forecastElement = document.querySelector("#daily-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
     <div class="col forecast">
                <ul>
                  <li><b>${formatHours(forecast.dt * 1000)}</b></li>
                  <li><img class="img-forecast" src="images/${
                    forecast.weather[0].icon
                  }.png"/></li>
                 </ul>
                  <span class="forecast-temp degree">${Math.round(
                    forecast.main.temp
                  )}</span>
                  <span class="degree">°</span>
              </div> 
              `;
  }
}

function citySearch(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

citySearch("Warsaw");

// conversion to farenheit and celsius

function showFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let showTemp = document.querySelector(".defaultTemp");
  showTemp.innerHTML = farenheitTemperature;
  let forecastMax = document.querySelectorAll(".forecast-temp");
  forecastMax.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
  // to avoid double conversion
  celsiusLink.addEventListener("click", showCelsiusTemperature);
  farenheitLink.removeEventListener("click", showFarenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let showTemp = document.querySelector(".defaultTemp");
  showTemp.innerHTML = Math.round(celciusTemperature);
  let forecastMax = document.querySelectorAll(".forecast-temp");
  forecastMax.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Celsius
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  // to avoid double conversion
  celsiusLink.removeEventListener("click", showCelsiusTemperature);
  farenheitLink.addEventListener("click", showFarenheitTemperature);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

let buttonShowPosition = document.querySelector("#current-button");
buttonShowPosition.addEventListener("click", showPosition);

//Cities buttons current weather

//Chicago

function showPositionChicago(position) {
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let city = "Chicago";
  let chicagoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(chicagoUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let chicagoButton = document.querySelector("#Chicago");
chicagoButton.addEventListener("click", showPositionChicago);

let chicagoForecastButton = document.querySelector("#Chicago");
chicagoForecastButton.addEventListener("click", displayForecast);

//London

function showPositionLondon(position) {
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let city = "London";
  let londonUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(londonUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let londonButton = document.querySelector("#London");
londonButton.addEventListener("click", showPositionLondon);

let londonForecastButton = document.querySelector("#London");
londonForecastButton.addEventListener("click", displayForecast);

//Warsaw

function showPositionWarsaw(position) {
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let city = "Warsaw";
  let warsawUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(warsawUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let warsawButton = document.querySelector("#Warsaw");
warsawButton.addEventListener("click", showPositionWarsaw);

let warsawForecastButton = document.querySelector("#Warsaw");
warsawForecastButton.addEventListener("click", displayForecast);

//Tokyo

function showPositionTokyo(position) {
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let city = "Tokyo";
  let tokyoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(tokyoUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let tokyoButton = document.querySelector("#Tokyo");
tokyoButton.addEventListener("click", showPositionTokyo);

let tokyoForecastButton = document.querySelector("#Tokyo");
tokyoForecastButton.addEventListener("click", displayForecast);
