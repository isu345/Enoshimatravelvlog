const apiKey = "efea18a101b84b7e920101949251007";
const input = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const resultsDiv = document.getElementById("weather-results");

searchBtn.addEventListener("click", () => {
  const query = input.value.trim();
  if (query) {
    fetchWeather(query);
  }
});

async function fetchWeather(query) {
  resultsDiv.innerHTML = "<p>Loading...</p>";
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`
    );
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    showWeather(data);
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching weather data.</p>";
    console.error(error);
  }
}

function showWeather(data) {
  resultsDiv.innerHTML = `
    <h3>${data.location.name}, ${data.location.country}</h3>
    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
      <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" class="weather-icon" />
      <div>
        <p class="temperature">${data.current.temp_c}°C</p>
        <p>${data.current.condition.text}</p>
      </div>
    </div>
    <p>Feels Like: ${data.current.feelslike_c}°C</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind: ${data.current.wind_kph} km/h ${data.current.wind_dir}</p>
    <p>UV Index: ${data.current.uv}</p>
    <p>Last Updated: ${data.current.last_updated}</p>
  `;
}