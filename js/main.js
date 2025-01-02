const todayName = document.getElementById("todayName");
const todayNumber = document.getElementById("todayNumber");
const todayMonth = document.getElementById("todayMonth");
const todayCity = document.getElementById("todayCity");
const todayTemprature = document.getElementById("todayTemprature");
const todayIcon = document.getElementById("todayIcon");
const todayState = document.getElementById("todayState");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDirection = document.getElementById("windDirection");
const tomorrowElements = document.querySelectorAll(
  ".TomorrowName, .TomorrowIcon, .maxTemp, .minTemp, .tomorrowState"
);
const search = document.getElementById("search");

async function getWeatherData(cityName) {
  const apiKey = "9cef9568fc064240a5d214437250201";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`;
  const response = await fetch(url);
  return await response.json();
}

function displayToday(data) {
  todayCity.textContent = data.location.name;
  todayTemprature.textContent = `${data.current.temp_c}°C`;
  todayState.textContent = data.current.condition.text;
  todayIcon.src = `https:${data.current.condition.icon}`;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_kph} kph`;
  windDirection.textContent = data.current.wind_dir;

  const todayDate = new Date();
  todayName.textContent = todayDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  todayNumber.textContent = todayDate.getDate();
  todayMonth.textContent = todayDate.toLocaleDateString("en-us", {
    month: "long",
  });
}

function displayNextDays(data) {
  const forecast = data.forecast.forecastday.slice(1);
  forecast.forEach((day, index) => {
    const tomorrowDate = new Date(day.date);
    tomorrowElements[index * 5].textContent = tomorrowDate.toLocaleDateString(
      "en-us",
      { weekday: "long" }
    );
    tomorrowElements[index * 5 + 1].src = `https:${day.day.condition.icon}`;
    tomorrowElements[index * 5 + 2].textContent = `${day.day.maxtemp_c}°C`;
    tomorrowElements[index * 5 + 3].textContent = `${day.day.mintemp_c}°C`;
    tomorrowElements[index * 5 + 4].textContent = day.day.condition.text;
  });
}

async function startApp(city = "Cairo") {
  const weatherResponse = await getWeatherData(city);
  if (!weatherResponse.error) {
    displayToday(weatherResponse);
    displayNextDays(weatherResponse);
  } else {
    alert("City not found. Please try again.");
  }
}

search.addEventListener("input", function () {
  const city = search.value.trim();
  if (city) {
    startApp(city);
  }
});

startApp();
