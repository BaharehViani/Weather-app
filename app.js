let apiKey = "4bada4e2ef8cba4745bcdtf450236obd";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=paris&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(display);
function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let apiKey = "4bada4e2ef8cba4745bcdtf450236obd";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(display);
}
  
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
  
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
  
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
