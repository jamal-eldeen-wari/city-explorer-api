const weather = require('../data/weather.json');
const Forecast = require('../models/Forecast');
require('dotenv').config();
function getJsonWeatherData(req, res) {
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
}
module.exports = getJsonWeatherData;
