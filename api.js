async function getWeather(city) {
  const apiKey = "b1e772fb96709aa274d8a04e6f1f7df5";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      temp: data.main.temp,
      desc: data.weather[0].description,
      humidity: data.main.humidity
    };
  } catch (error) {
    return null;
  }
}
let map;

async function showMap(place) {

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${place}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.length === 0) {
    alert("Place not found");
    return;
  }

  const lat = data[0].lat;
  const lon = data[0].lon;

  if (map) {
    map.remove();
  }

  map = L.map('map').setView([lat, lon], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  L.marker([lat, lon]).addTo(map)
    .bindPopup(place)
    .openPopup();
}
