
let assert = chai.assert;
let expect = chai.expect;

describe('getGeoLocation', function() {
    it('should test for geolocation', function() {
        expect(navigator.geolocation).to.have.property('getCurrentPosition');
    });
});

describe('getLocalStorageItems', function() {
    it('should return users coordinates saved to localstorage', function() {
        let coordinates = getLocalStorageItems();
        expect(coordinates.lat && coordinates.long).to.exist;
    });
});

describe('getWeather', function() {

    let weatherQuery;
    let weatherResult;

    before(async function () {
        let sampleCoordinates = { lat: -34.93192270000001, long: 138.6402574};
        weatherQuery = await getWeather(sampleCoordinates);
        weatherResult = await weatherQuery.json();
    });

    it('should return status 200 from sunrise sunset api', function() {
        assert.equal(weatherQuery.status, 200);
    });

    it('should return non null sunrise sunset data', function() {
        expect(weatherResult.results.sunrise && weatherResult.results.sunrise).to.exist;
    });

});

describe('addWeatherToPage', function() {

    let div = document.createElement("div");
    div.id = "insertWeather";
    document.body.appendChild(div);

    before(function(){
        let sampleInput = { results : { sunrise: '2017-08-13T21:26:22+00:00', sunset: '2017-08-14T08:13:45+00:00'}};
        addWeatherToPage(sampleInput);
    });

    after(function(){
        document.body.removeChild(div)
    });

    it('should append weather data to profile page', function() {
        let expectedResult = "<li>Sunrise 6:56:22 AM</li><br><li>Sunset 5:43:45 PM</li>";
        let sunriseSunsetHTML = document.getElementById('insertWeather');
        expect(sunriseSunsetHTML.innerHTML).to.equal(expectedResult);
    });

});

