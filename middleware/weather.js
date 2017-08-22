const apiKey = require('../config.js').apikey;
let fetch = require('node-fetch');

function getRawWeather() {
    return fetch(apiKey);
}

function createWeatherObj(weatherIn) {

    let weatherObj = {
        "temp": weatherIn.main.temp,
        "outlook": weatherIn.weather["0"].description,
        "humidity": weatherIn.main.humidity,
        "sunrise": (new Date(weatherIn.sys.sunrise * 1000)).toLocaleTimeString('en-US'),
        "sunset": (new Date(weatherIn.sys.sunset * 1000)).toLocaleTimeString('en-US')
    };

    return weatherObj;
}

async function getWeather() {

    try {
        let weather = await getRawWeather();
        let weatherJSON = await weather.json();
        let weatherObj = await createWeatherObj(weatherJSON);
            return weatherObj;
    }
    catch(err){
        console.error(err);
    }
}

module.exports.getRawWeather = getRawWeather;
module.exports.createWeatherObj = createWeatherObj;
module.exports.getWeather = getWeather;

