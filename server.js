const express = require('express'); // require the express package
const cors = require('cors');
const Weather = require('./data/weather.json');

require('dotenv').config();
const app = express(); // initialize your express app instance

const PORT = process.env.PORT;
app.use(cors());


// a server endpoint
app.get('/weather', // our endpoint name
  function (req, res) {

    let searchQuery = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;
    console.log(searchQuery,lat,lon);


    let cityArray = Weather.find(element => element.city_name === searchQuery);

    class Forecast{
      constructor(object){
        this.date = object.datetime;
        this.description = object.description;
      }
    }
    let cityArr = [];
    cityArray.Weather.map((element) =>{
      return cityArr.push(new Forecast(element.datetime, `Low of ${element.low_temp}, high of ${element.high_temp} with ${element.weather.description}`));
    });


    res.send(cityArray);

    // callback function of what we should do with our request
  });


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});// kick start the express server to work
