require('dotenv').config();
const axios = require('axios');
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const Weather= require('../models/Weather');
const Cache = require('../helpers/cache.helpers');
let cacheObj = new Cache();

async function weatherData(latitude,longitude){
  const queryParam = {
    params: {
      key: WEATHERBIT_KEY,
      lat: latitude,
      lon: longitude,
    }
  };
  const response = await axios.get(WEATHERBIT_URL,queryParam);
  const data = response.data.data.map(element => new Weather(element));

  cacheObj.forecast.push({
    lat:latitude,
    lon:longitude,
    data:data
  });
  return data;
}

async function getWeatherData(req,res){
  const {latitude,longitude} = req.query;
  if (((Date.now() - cacheObj.timeStamp) > 86400000)) {
    // 86400000 is equivalent to 1 day; if exceded reset cache
    cacheObj = new Cache();
  }
  if (cacheObj.forecast.length) {

    const filteredData = cacheObj.forecast.find((location) => {
      return location.lat === latitude && location.lon === longitude;
    });

    if (filteredData) {
      console.log('getting the data from the cache');
      // this (if) is for checking if we have data on the cache if that is the case take from the cache otherwise from the api (else)
      res.json(filteredData.data);
    } else {
      // if no lat or lon match get the data from weather-bit
      res.json(await weatherData(latitude, longitude));
    }
  } else {

    res.json(await weatherData(latitude, longitude));
  }
  // console.log(WEATHERBIT_URL);
  // console.log(queryParam);

}
module.exports = getWeatherData;
