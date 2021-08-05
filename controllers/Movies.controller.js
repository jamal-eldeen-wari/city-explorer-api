require('dotenv').config();
const axios = require('axios');
const Movie= require('../models/Movie');
const MOVIE_API_URL = process.env.MOVIE_API_URL;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Cache = require('../helpers/cache.helpers');
let cacheObjMov = new Cache();

async function movieData(city){
  const queryParams = {
    params: {
      api_key: MOVIE_API_KEY,
      query: city,
    }
  };
  const responseMovie = await axios.get(MOVIE_API_URL,queryParams);
  const data = responseMovie.data.results.map(element => new Movie(element));
  cacheObjMov.movies.push({
    query:city,
    results:data
  });

  return data;

}


async function getMoviesData (req,res) {
  const city = req.query.city;
  if (((Date.now() - cacheObjMov.timeStamp) > 86400000)) {
    // 86400000 is equivalent to 1 day; if exceded reset cache
    cacheObjMov = new Cache();
  }
  if (cacheObjMov.movies.length) {

    const filteredData = cacheObjMov.movies.find((location) => {
      return location.query === city ;
    });
    if (filteredData) {
      // this (if) is for checking if we have data on the cache if that is the case take from the cache otherwise from the api (else)
      res.json(filteredData.results);
    } else {
      // if no lat or lon match get the data from weather-bit
      res.json(await movieData(city));
    }
  } else {

    res.json(await movieData(city));
  }

}
// async function getMoviesData (req,res) {
//   const city = req.query.city;
//   const responseMovie = await axios.get(`${MOVIE_API_URL}?api_key=${MOVIE_API_KEY}&query=${city}`);
//   console.log(responseMovie.data.results);
//   const data = responseMovie.data.results.map(element => new Movie(element));
//   res.json(data);

// }
module.exports = getMoviesData;
