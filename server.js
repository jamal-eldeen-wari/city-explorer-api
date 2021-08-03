const express = require('express'); // require the express package
const cors = require('cors');
const axios = require('axios');
const Weather = require('./data/weather.json');
const weather= require('./models/Weather');

require('dotenv').config();
const app = express(); // initialize your express app instance

const PORT = process.env.PORT;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const MOVIE_API_URL = process.env.MOVIE_API_URL;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.use(cors());


// a server endpoint
app.get('/weather', // our endpoint name
  function (req, res) {
    console.log(req.query);
    let searchQuery = req.query.searchQuery;
    let lat = Number (req.query.lat);
    let lon = Number(req.query.lon);
    console.log(searchQuery,lat,lon);

    try{
      let cityArray = Weather.find(element => element.city_name.toLowerCase() === searchQuery.toLowerCase());

      class Forecast{
        constructor(object){
          this.date = object.datetime;
          this.description = object.description;
        }
      }
      console.log(cityArray);
      let cityArr =cityArray.data.map((element) =>{
        console.log(element.datetime);
        //key inside of the forecast instance must be written the same way it is shown in the weather.json;
        return (new Forecast({datetime:element.datetime, description:`Low of ${element.low_temp}, high of ${element.high_temp} with ${element.weather.description}`} ));
      });
      res.send(cityArr);

    }catch(e){
      res.status(500).send('invalid data entered');

    }
    // callback function of what we should do with our request
  });
// weatherbit api here.
app.get('/weatherbit',async (res,req) =>{

  const {latitude,longitude} = req.query;
  const response = await axios.get(`${WEATHERBIT_URL}?key=${WEATHERBIT_KEY}&lat=${latitude}&${longitude}`);
  const data = response.data.data.map(element => new Weather(element));
  res.json(data);

});
app.get('/movie', async (res,req) =>{
  const responseMovie = await axios.get(`${MOVIE_API_URL}?key=${MOVIE_API_KEY}`);
  res.json(responseMovie);

});


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});// kick start the express server to work
