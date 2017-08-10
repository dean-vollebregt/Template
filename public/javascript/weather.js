
function getWeather() {
    return fetch("http://api.openweathermap.org/data/2.5/weather?");
}

function addWeatherToPage(weatherIn) {
    let temp = weatherIn.main.temp;
    let outlook = weatherIn.weather["0"].description;
    let humidity = weatherIn.main.humidity + "%";
    let sunrise = (new Date(weatherIn.sys.sunrise*1000)).toLocaleTimeString();
    let sunset = (new Date(weatherIn.sys.sunset*1000)).toLocaleTimeString();

    document.getElementById('weatherItems').innerHTML =
          "<li>" + "temperature - " + temp / 30 + "</li>" + "</br>"
        + "<li>" + "outlook - " + outlook + "</li>" + "</br>"
        + "<li>" + "humidity - " + humidity + "</li>" + "</br>"
        + "<li>" + "sunrise - " + sunrise + "</li>" + "</br>"
        + "<li>" + "sunset - " + sunset + "</li>";
}

(async function(){
    try {
        const weather = await getWeather();
        const weatherObject = await weather.json();
        addWeatherToPage(weatherObject);
    }
    catch(err){
        console.error(err);
    }
}());

