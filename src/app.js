const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirertoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirertoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Matthew Campbell',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Matthew Campbell',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ea!',
    name: 'Matthew Campbell',
  });
});

// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Matthew',
//     age: 31,
//   });
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>');
// });

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: 'Sunny',
  //   location: 'Cape Town',
  //   address: req.query.address,
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Matthew Campbell',
    message: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Matthew Campbell',
    message: 'Page not found',
  });
});

//matthewcampbell.co.za
//matthewcampbell.co.za/about
//matthewcampbell.co.za/contact
//matthewcampbell.co.za/projects

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// });
