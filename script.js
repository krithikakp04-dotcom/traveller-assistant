// Show initial message
function showMessage() {
    document.getElementById("msg").innerHTML =
    "This is your smart AI travel buddy! Just enter your destination, trip duration, budget, and travel style to get a personalized travel plan with weather updates, hotel suggestions, attractions, and more! 🌍✈️";
}

// Generate trip plan
async function generatePlan() {
    document.getElementById("result").innerHTML = "<p>⏳ Planning your perfect trip...</p>";

    const place = document.getElementById("place").value;
    const days = document.getElementById("days").value;
    const budget = document.getElementById("budget").value;
    const style = document.getElementById("style").value;

    if (!place || !days || !budget || !style) {
        alert("Please fill all details ✨");
        return;
    }

    // 1️⃣ Initialize variables with fallback
    let weather = null, hotels = [], attractions = [], restaurants = [], emergency = [];

    // 2️⃣ Fetch all API data safely
    try { weather = await getWeather(place); } catch(e) { console.log("Weather API error", e); }
    try { hotels = await getHotels(place); } catch(e) { console.log("Hotels API error", e); }
    try { attractions = await getAttractions(place); } catch(e) { console.log("Attractions API error", e); }
    try { restaurants = await getRestaurants(place); } catch(e) { console.log("Restaurants API error", e); }
    try { emergency = await getEmergency(place); } catch(e) { console.log("Emergency API error", e); }

    // 3️⃣ Generate HTML for each section with fallback
    let weatherHTML = weather
        ? `<h3>🌦 Weather</h3>
           <p>🌡 ${weather.temp}°C | ${weather.desc} | 💧 Humidity ${weather.humidity}%</p>`
        : `<p>Weather data not available</p>`;

    let hotelHTML = "<h3>🏨 Nearby Hotels</h3><ul>";
    if(hotels.length === 0) hotelHTML += "<li>No hotels found</li>";
    hotels.forEach(h => hotelHTML += `<li>${h.display_name}</li>`);
    hotelHTML += "</ul>";

    let attractionHTML = "<h3>📍 Tourist Attractions</h3><ul>";
    if(attractions.length === 0) attractionHTML += "<li>No attractions found</li>";
    attractions.forEach(a => attractionHTML += `<li>${a.tags.name || a.display_name}</li>`);
    attractionHTML += "</ul>";

    let restaurantHTML = "<h3>🍽 Restaurants</h3><ul>";
    if(restaurants.length === 0) restaurantHTML += "<li>No restaurants found</li>";
    restaurants.forEach(r => restaurantHTML += `<li>${r.tags.name || r.display_name}</li>`);
    restaurantHTML += "</ul>";

    let emergencyHTML = "<h3>🚨 Emergency Services</h3><ul>";
    if(emergency.length === 0) emergencyHTML += "<li>No emergency places found</li>";
    emergency.forEach(e => {
        const name = e.tags.name || e.tags.amenity || e.display_name;
        emergencyHTML += `<li>${name}</li>`;
    });
    emergencyHTML += "</ul>";

    // 4️⃣ Create itinerary, stay, food, transport, packing
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

    // 5️⃣ Display everything
    document.getElementById("result").innerHTML = `
        <div class="plan-card">
            <h2>🌍 Trip to ${place}</h2>
            <p>🗓 <b>${days} Days</b> | 💰 <b>${budget}</b> | 🎒 <b>${style}</b></p>

            ${weatherHTML}
            ${hotelHTML}
            ${attractionHTML}
            ${restaurantHTML}
            ${emergencyHTML}

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

    // 6️⃣ Show Map at the bottom
    try {
        showMap(place);
    } catch(e) {
        console.log("Map error", e);
    }
}