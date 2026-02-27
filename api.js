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