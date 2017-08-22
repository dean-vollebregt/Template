let expect = require('chai').expect;

describe('getWeather', function() {

    let openWeatherMap;
    let openWeatherMapJSON;
    let weatherObj;

    before(async function () {
        openWeatherMap = await require('../../../middleware/weather').getRawWeather();
        openWeatherMapJSON = await openWeatherMap.json();
        weatherObj = await require('../../../middleware/weather').createWeatherObj(openWeatherMapJSON);
    });

    it('get staus 200 from OpenWeatherMap Api ', function() {
        expect(openWeatherMap.status).to.equal(200);
    });

    it('should return non null weather data', function() {
        expect(weatherObj.temp && weatherObj.outlook && weatherObj.humidity && weatherObj.sunrise).to.exist;
    });
    
});




























