const express = require('express'); // require the express package
const cors = require('cors');
const axios = require('axios');
const weather = require('./data/weather.json');
const Weather= require('./models/Weather');
const Forecast = require('./models/Forecast');

require('dotenv').config();
const app = express(); // initialize your express app instance

const PORT = process.env.PORT;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const MOVIE_API_URL = process.env.MOVIE_API_URL;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.use(cors());

// some notes;
// a server endpoint
app.get('/weather', // our endpoint name
  function (req, res) {
    console.log(req.query);
    let searchQuery = req.query.searchQuery;

    try{
      let cityArray = weather.find(element => element.city_name.toLowerCase() === searchQuery.toLowerCase());

      console.log(cityArray);
      let cityArr =cityArray.data.map((element) =>{
        //key inside of the forecast instance must be written the same way it is shown in the weather.json;
        return (new Forecast({datetime:element.datetime, description:`Low of ${element.low_temp}, high of ${element.high_temp} with ${element.weather.description}`} ));
      });
      res.send(cityArr);

    }catch(e){
      res.status(500).send('invalid data entered');

    }
  });
// weatherbit api here.
app.get('/weather-bit',async (req,res) =>{
  const {latitude,longitude} = req.query;
  const queryParam={
    params:{
      key:WEATHERBIT_KEY,
      lat:latitude,
      lon:longitude,
    }
  };

  const response = await axios.get(WEATHERBIT_URL,queryParam);
  const data = response.data.data.map(element => new Weather(element));
  res.json(data);

});
app.get('/movie', async (req,res) =>{
  const responseMovie = await axios.get(`${MOVIE_API_URL}?key=${MOVIE_API_KEY}`);
  res.json(responseMovie);

});


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
