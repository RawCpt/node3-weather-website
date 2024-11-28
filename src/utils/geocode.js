const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoibWF0dC10ZXN0IiwiYSI6ImNtM2J6ZWt1ZDFpc2gya3IxbHdiM2tldTcifQ.GOVN1t9c0h60f8uMeJTBfw&limit=1`; // encode prevents crashing when searching for special charaters like ?

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback(
        'Unable to find location. Try again with different search term',
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].properties.coordinates.latitude,
        longitude: body.features[0].properties.coordinates.longitude,
        location: body.features[0].properties.full_address,
      });
    }
  });
};

module.exports = geocode;

//old code

// const geoCodeUrl = 'https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=pk.eyJ1IjoibWF0dC10ZXN0IiwiYSI6ImNtM2J6ZWt1ZDFpc2gya3IxbHdiM2tldTcifQ.GOVN1t9c0h60f8uMeJTBfw&limit=1'

// request({ url: geoCodeUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connet to the location service!')
//     } else if (response.body.features.length === 0) {
//     console.log('Unable to find location. Try again with different search term')
//     } else {
//         const longitude = response.body.features[0].properties.coordinates.longitude
//         const latitude = response.body.features[0].properties.coordinates.latitude
//         console.log(longitude, latitude)
//     }
// })
