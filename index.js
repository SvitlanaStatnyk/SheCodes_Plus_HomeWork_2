let now = new Date();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function formatDate(dateShow) {
  let dateAll = document.querySelector("#date-time");
  let hours = dateShow.getHours();
  let minutes = dateShow.getMinutes();
  let date = dateShow.getDate();
  hours = checkTime(hours);
  minutes = checkTime(minutes);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateShow.getDay()];
  let months = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  let month = months[dateShow.getMonth()];

  dateAll.innerHTML = `${month} ${date}, ${day}, ${hours}:${minutes}`;
  return dateAll.innerHTML;
}
formatDate(now);

function fahrenheit(event) {
  event.preventDefault();
  let changesFC = document.querySelector("#temperature");
  let temperature = changesFC.innerHTML;
  temperature = Number(temperature);
  changesFC.innerHTML = Math.round(temperature * 1.8) + 32;
}
let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  let changeCF = document.querySelector("#temperature");
  changeCF.innerHTML = 19;
}
let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", celsius);

function weather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
}

function manualInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", manualInput);

search("Athens");

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentButton");
button.addEventListener("click", getPosition);
