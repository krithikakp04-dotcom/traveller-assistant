// Frontend logic for Traveller Assistant
async function generatePlan() {
  const place = document.getElementById('place').value;
  const days = parseInt(document.getElementById('days').value, 10);
  const budget = document.getElementById('budget').value;
  const style = document.getElementById('style').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  if (!place || !days || !budget || !style) {
    resultDiv.innerHTML = '<div class="plan-card"><b>Please fill all fields.</b></div>';
    return;
  }

  try {
    // Use frontend-only trip planner
    const data = generateTripPlan({ place, days, budget, style });
    let html = `<div class='plan-card'><h2>Trip to ${data.destination}</h2>`;
    html += `<h3>Style: ${data.style}, Budget: ${data.budget}, Days: ${data.days}</h3>`;
    data.plan.forEach(day => {
      html += `<h3>Day ${day.day}</h3><ul>`;
      day.activities.forEach(act => {
        html += `<li>${act}</li>`;
      });
      html += '</ul>';
    });
    html += '</div>';
    resultDiv.innerHTML = html;
    showMap(place);
  } catch (err) {
    resultDiv.innerHTML = '<div class="plan-card"><b>Failed to generate plan.</b></div>';
  }
}

// Map display using Leaflet and OpenStreetMap
let map;
async function showMap(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length === 0) {
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