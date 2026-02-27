function showMessage() {
    document.getElementById("msg").innerHTML =
    "Traveller Assistant project started successfully!";
}
async function generatePlan() {
  document.getElementById("result").innerHTML = "<p>⏳ Planning your perfect trip...</p>"
  const place = document.getElementById("place").value;
  const days = document.getElementById("days").value;
  const budget = document.getElementById("budget").value;
  const style = document.getElementById("style").value;

  const weather = await getWeather(place);

  let weatherHTML = weather
  ? `<h3>🌦 Weather</h3>
     <p>🌡 ${weather.temp}°C | ${weather.desc} | 💧 Humidity ${weather.humidity}%</p>`
  : `<p>Weather data not available</p>`;

  if (!place || !days || !budget || !style) {
    alert("Please fill all details ✨");
    return;
  }

  let itinerary = "";
  for (let i = 1; i <= days; i++) {
    itinerary += `<li>Day ${i}: Explore top attractions, local food & relaxation</li>`;
  }

  let stay = budget === "low" ? "Hostels & budget hotels" :
             budget === "medium" ? "3-star hotels & homestays" :
             "Luxury resorts & premium hotels";

  let food = style === "solo" ? "Street food & cafés" :
             style === "friends" ? "Trending food spots & nightlife cafés" :
             style === "family" ? "Family restaurants & local cuisine" :
             "Romantic cafés & fine dining";

  let transport = "Local buses, taxis, autos & rentals";

  let packing = "Clothes, toiletries, charger, power bank, ID cards, medicines";

  document.getElementById("result").innerHTML = `
    <div class="plan-card">
      <h2>🌍 Trip to ${place}</h2>
      <p>🗓 <b>${days} Days</b> | 💰 <b>${budget}</b> | 🎒 <b>${style}</b></p>
          ${weatherHTML}
      <h3>📅 Itinerary</h3>
      <ul>${itinerary}</ul>

      <h3>🏨 Stay Suggestions</h3>
      <p>${stay}</p>

      <h3>🍽 Food Ideas</h3>
      <p>${food}</p>

      <h3>🚕 Transport</h3>
      <p>${transport}</p>

      <h3>🎒 Packing Checklist</h3>
      <p>${packing}</p>
    </div>
  `;
}