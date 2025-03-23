function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}
  
function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let apiKey = "4bada4e2ef8cba4745bcdtf450236obd";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=metric`;
    let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchInputElement.value}&key=${apiKey}&units=metric`
    
    let currentDateELement = document.querySelector("#current-date");
    let currentDate = new Date();
    currentDateELement.innerHTML = formatDate(currentDate);

    axios.get(apiUrl).then(display);
    axios.get(forecastUrl).then(displayForecast);
}
    
function display(response) {
    let currentTemp = response.data.temperature.current;
    let currentCity = response.data.city;
    let humidity = response.data.temperature.humidity;
    let windSpeed = response.data.wind.speed;
    let description = response.data.condition.description;
    let iconUrl = response.data.condition.icon_url;
  
    let tempElement = document.querySelector(".current-temperature-value");
    let cityElement = document.querySelector("#current-city");
    let humidityElement = document.querySelector("#current-humidity");
    let conditionElement = document.querySelector("#current-condition");
    let windElement = document.querySelector("#current-wind");
    let iconElement = document.querySelector(".current-temperature-icon");
  
    tempElement.innerHTML = Math.round(currentTemp);
    cityElement.innerHTML = currentCity;
    conditionElement.innerHTML = description;
    humidityElement.innerHTML = `${humidity}%`;
    windElement.innerHTML = `${windSpeed}km/h`;
    iconElement.innerHTML = `<img src="${iconUrl}">`;
}
  
function displayForecast(response) {
    let forecastDays = response.data.daily;
    let forecastElements = document.querySelectorAll(".weather-forecast-day");
  
    forecastDays.forEach(function (day, index) {
      if (index < forecastElements.length) {
        let dateElement = forecastElements[index].querySelector(".weather-forecast-date");
        let iconElement = forecastElements[index].querySelector(".weather-forecast-icon");
        let maxTempElement = forecastElements[index].querySelector(".weather-forecast-temperature-max strong");
        let minTempElement = forecastElements[index].querySelector(".weather-forecast-temperature-min");
  
        let date = new Date(day.time * 1000);
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let formattedDate = days[date.getDay()];
  
        dateElement.innerHTML = formattedDate;
        iconElement.src = day.condition.icon_url;
        iconElement.alt = day.condition.icon;
        maxTempElement.innerHTML = `${Math.round(day.temperature.maximum)}º`;
        minTempElement.innerHTML = `${Math.round(day.temperature.minimum)}º`;
      }
    });
}
  
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
    
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
  
let apiKey = "4bada4e2ef8cba4745bcdtf450236obd";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=london&key=${apiKey}&units=metric`;
let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=london&key=${apiKey}&units=metric`
axios.get(apiUrl).then(display);
axios.get(forecastUrl).then(displayForecast);