
function getGeoLocation() {
    function storeLocal(position) {
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("long", position.coords.longitude);
    }
    function error(error) {
        if (error.code) {
            window.alert("Please allow geolocation and refresh your browser")
        }
    }
    navigator.geolocation.getCurrentPosition(storeLocal,error);

}

function getLocalStorageItems(){
    return { lat : localStorage.getItem("lat"), long : localStorage.getItem("long")};
}

// https://sunrise-sunset.org/api
function getWeather(coordinates) {
    return fetch(`https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.long}&date=today&formatted=0`);
}

function addWeatherToPage(weatherIn) {
    let sunrise = new Date(weatherIn.results.sunrise).toLocaleTimeString('en-US');
    let sunset = new Date(weatherIn.results.sunset).toLocaleTimeString('en-US');

    document.getElementById('insertWeather').innerHTML =
        "<li>" + "Sunrise " + sunrise + "</li>" + "</br>" +
        "<li>" + "Sunset " + sunset + "</li>";
}

(async function(){
    try {
        getGeoLocation();
        let coordinates = await getLocalStorageItems();
        let weatherQuery = await getWeather(coordinates);
        let weatherResult = await weatherQuery.json();
        addWeatherToPage(weatherResult);
    }
    catch(err){
        console.error(err);
    }
}());

