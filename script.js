const form = document.getElementById("locationForm");
const locationInput = document.getElementById("locationInput");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const otherInfo = document.getElementById("otherInfo");

const apiKey = "YOUR_API_KEY"; // Replace with your weather API key

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => {
      alert(error.message);
      weatherInfo.classList.add("hidden");
    });
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;

  cityName.textContent = `Weather in ${name}`;
  temperature.textContent = `Temperature: ${main.temp}°C`;
  description.textContent = `Condition: ${weather[0].description}`;
  otherInfo.textContent = `Humidity: ${main.humidity}% | Wind Speed: ${wind.speed} m/s`;

  weatherInfo.classList.remove("hidden");
}