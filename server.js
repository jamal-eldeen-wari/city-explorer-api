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


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});// kick start the express server to work
