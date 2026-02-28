// Frontend-only trip plan generator (no server needed)
function generateTripPlan({ place, days, budget, style }) {
  return {
    destination: place,
    days,
    budget,
    style,
    plan: Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      activities: [
        `Explore top sights in ${place}`,
        budget === 'low' ? 'Enjoy local street food' : 'Dine at a popular restaurant',
        style === 'solo' ? 'Meet other travelers' : `Fun with your ${style}`
      ]
    }))
  };
}