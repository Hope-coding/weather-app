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

// let celsiusLink = document.querySelector("#celsius");
// celsiusLink.addEventListener("click", changeTemperature);

// let fahrenheitLink = document.querySelector("#fahrenheit");
// fahrenheitLink.addEventListener("click", changeTemperature);

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text-input");
  searchCity(input.value);
}
function searchCity(city) {
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let condition = document.querySelector("#temperature");
  condition.innerHTML = `${temperature}`;
  let feel = Math.round(response.data.main.feels_like);
  let humid = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let currentFeel = document.querySelector("#current-feel");
  currentFeel.innerHTML = `🌡️ Feels like: ${feel}°C`;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `💧 Humidity: ${humid}%`;
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `💨 Wind: ${wind}km/h`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

let changeCity = document.querySelector("#city-name");
let submitForm = document.querySelector("#search-form");
submitForm.addEventListener("submit", search);

// Bonus - current location
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
