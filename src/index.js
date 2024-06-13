function giveResponse(response) {
  let area = document.querySelector("#Weather");
  let data = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");

  city.innerHTML = response.data.city;
  area.innerHTML = data;
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
