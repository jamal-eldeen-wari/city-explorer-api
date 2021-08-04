require('dotenv').config();
const axios = require('axios');
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const Weather= require('../models/Weather');

async function getWeatherData(req,res){
  const {latitude,longitude} = req.query;
  const queryParam={
    params:{
      key:WEATHERBIT_KEY,
      lat:latitude,
      lon:longitude,
    }
  };
  console.log(WEATHERBIT_URL);
  console.log(queryParam);
  const response = await axios.get(WEATHERBIT_URL,queryParam);
  const data = response.data.data.map(element => new Weather(element));
  res.json(data);

}
module.exports = getWeatherData;
