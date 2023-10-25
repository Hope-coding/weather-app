// Date & Time
let now = new Date();

let h7 = document.querySelector("h7");
let h6 = document.querySelector("h6");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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
let month = months[now.getMonth()];

h7.innerHTML = `${day} ${date} ${month}`;
h6.innerHTML = `${hours}:${minutes}`;

// Search City
function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text-input");
  searchCity(input.value);
}

searchCity("London");

function searchCity(city) {
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showTemperature);
}

// Display Temperature & Description
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let condition = document.querySelector("#temperature");
  condition.innerHTML = `${temperature}`;

  let feel = Math.round(response.data.main.feels_like);
  let humid = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;

  let currentFeel = document.querySelector("#current-feel");
  currentFeel.innerHTML = `🌡️ Feels like: ${feel}°C`;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `💧 Humidity: ${humid}%`;

  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `💨 Wind: ${wind}km/h`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  condition.innerHTML = Math.round(celsiusTemperature);
}

let changeCity = document.querySelector("#city-name");
let submitForm = document.querySelector("#search-form");
submitForm.addEventListener("submit", search);

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

// Temperature Conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
