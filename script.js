var apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

var searchInput = document.getElementById('city-input');
var searchButton = document.getElementById('search-btn');
var locationElement = document.getElementById('location');
var temperatureElement = document.getElementById('temperature');
var descriptionElement = document.getElementById('description');
var iconElement = document.getElementById('icon');

// Function to fetch weather data from the OpenWeatherMap API
function fetchWeatherData(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(function (data) {
            displayWeatherData(data);
        })
        .catch(function (error) {
            console.log(error);
            alert('An error occurred while fetching weather data.');
        });
}

// Function to display weather data on the dashboard
function displayWeatherData(data) {
    var location = data.name + ', ' + data.sys.country;
    var temperature = data.main.temp + '°C';
    var description = data.weather[0].description;
    var iconUrl = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';

    locationElement.textContent = location;
    temperatureElement.textContent = temperature;
    descriptionElement.textContent = description;
    iconElement.innerHTML = '<img src="' + iconUrl + '" alt="Weather Icon">';
}

// Function to handle the search button click event
function handleSearch() {
    var city = searchInput.value.trim();

    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
}

searchButton.addEventListener('click', handleSearch);