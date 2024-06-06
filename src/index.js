function searchCity(event) {
  event.preventDefault();

  let input = document.querySelector("#search");
  let city = document.querySelector("#city");
  city.innerHTML = input.value;
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", searchCity);
