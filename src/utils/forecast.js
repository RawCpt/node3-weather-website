const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=327c51b5bea03620c409dbea0ecf29c1&query=${latitude},${longitude}&unit=m`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to the weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees`
      );
    }
  });
};
module.exports = forecast;

// old code

// const url = 'http://api.weatherstack.com/current?access_key=327c51b5bea03620c409dbea0ecf29c1&query=-34.0883,18.4353&unit=m'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degress out. It feels like ${response.body.current.feelslike} degrees`)
//     }
// })
