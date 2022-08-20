let now = new Date();
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

let date = now.getDate();

let year = now.getFullYear();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let h1 = document.querySelector("h1");
h1.innerHTML = `${day}, ${month} ${date}, ${year}, ${hour}:${minute}`;

function displayWeather(response) {
  event.preventDefault();
  let weatherElement = document.querySelector("#weather");
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let status = response.data.weather[0].description;
  let precipitation = response.data.weather[0].main;
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = `${city}`;
  let temperatureElement = document.querySelector("h3");
  temperatureElement.innerHTML = `+${temperature} °C`;
  let statusElement = document.querySelector("h4");
  statusElement.innerHTML = `${status}`;
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = `Precipitation: ${precipitation}`;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `Pressure: ${pressure} hPa`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} km/h`;
  console.log(response.data);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "745dc5780612f3ff28ed6a9ef9d290f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "745dc5780612f3ff28ed6a9ef9d290f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
