function giveResponse(response) {
  let area = document.querySelector("#Weather");
  let dataDetails = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");
  let dataDescription = document.querySelector("#description");
  let dataHumidity = document.querySelector("#Humidity");
  let dataWind = document.querySelector("#wind");
  let dataTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let dataIcon = document.querySelector("#icon");

  dataIcon.innerHTML = `<img src="${response.data.condition.icon_url}">`;
  dataTime.innerHTML = formalTime(date);
  dataWind.innerHTML = `${response.data.wind.speed} km/h`;
  dataHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  dataDescription.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  area.innerHTML = dataDetails;

  getForecast(response.data.city);
}
function formalTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function getTemperature(city) {
  let ApiKey = "23e2742eef1f1bc7tod430e337aaf4bd";
  let ApiCall = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${ApiKey}&units=metric`;
  axios.get(ApiCall).then(giveResponse);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search");
  getTemperature(input.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", searchCity);

function formalDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let ApiKey = "23e2742eef1f1bc7tod430e337aaf4bd";
  let ApiCall = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${ApiKey}&units=metric`;
  axios(ApiCall).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="day">
            <div class="date">${formalDate(day.time)}</div>
            <div class="forecast-icon">
            <img src="${day.condition.icon_url}" class="icon">
            </div>
            <div class="forecast-temperature">
              <div class="min"><strong>${Math.round(
                day.temperature.maximum
              )}º</strong></div>
              <div class="min">${Math.round(day.temperature.minimum)}º</div>
            </div>
          </div>
`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

getTemperature("Paris");
