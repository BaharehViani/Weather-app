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
    let tempElement = document.querySelector(".current-temperature-value");
    let cityElement = document.querySelector("#current-city");
    tempElement.innerHTML = Math.round(currentTemp);
    cityElement.innerHTML = currentCity;
}
  
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
  
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
  
currentDateELement.innerHTML = formatDate(currentDate);
  