const express = require('express'); // require the express package
const cors = require('cors');
const weatherFunction = require('./controllers/Weather.controller');
const movieFunction = require('./controllers/Movies.controller');
const jsonWeatherFunction = require('./controllers/Jsonweather.controller');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());


// a weather.json file
app.get('/weather', jsonWeatherFunction);
// weatherbit api here.
app.get('/weather-bit', weatherFunction);
// Movie api here
app.get('/movie', movieFunction);


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
