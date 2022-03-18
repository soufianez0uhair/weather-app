const container = document.querySelector('.container');
const loading = document.querySelector('#loading');
const btn = document.querySelector('.btn');
async function getImage(description) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MWRZD7yMYpShASkGqGzBcoKGWuXO7VUj&s=${description}`);
    const imageData = await response.json();
    return imageData.data.images.original.url
}
async function getWeather() {
    const locInput = document.querySelector('#loc-input').value.toLowerCase();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locInput}&appid=0c1608c40da6c1a9ec63d71ea492f8b5`, {mode: 'cors'});
    const weatherData = await response.json();
    let weather = {
        theLocation: locInput,
        country: weatherData.sys.country,
        desc: weatherData.weather[0].description,
        temp: parseInt(weatherData.main.temp - 273.15) + "°C",
        humidity: weatherData.main.humidity + "%",
    }
    weather.image = await getImage(weather.desc);
    return weather
}
async function getLoc(e) {
    container.style.display = "none";
    loading.style.display = "block"
    e.preventDefault();
    const weather = await getWeather();
    showWeather(weather)
}
btn.addEventListener('click', (e) => getLoc(e))
function showWeather(item) {
    const locBox = document.querySelector('.loc');
    const countryBox = document.querySelector('.country');
    const tempBox = document.querySelector('.temp');
    const weatherImgBox = document.querySelector('#weather-img');
    const descBox = document.querySelector('.description');
    const humidityBox = document.querySelector('.humidity');
    locBox.innerHTML = `${item.theLocation.toUpperCase()}`;
    countryBox.innerHTML = `${item.country}`;
    tempBox.innerHTML = `${item.temp}`;
    weatherImgBox.src = `${item.image}`;
    descBox.innerHTML = `${item.desc}`;
    humidityBox.innerHTML = `Humidity: ${item.humidity}`;
    container.style.display = "flex";
    loading.style.display = "none"
}