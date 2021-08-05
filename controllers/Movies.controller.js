require('dotenv').config();
const axios = require('axios');
const Movie= require('../models/Movie');
const MOVIE_API_URL = process.env.MOVIE_API_URL;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

async function getMoviesData (req,res) {
  const city = req.query.city;
  const responseMovie = await axios.get(`${MOVIE_API_URL}?api_key=${MOVIE_API_KEY}&query=${city}`);
  console.log(responseMovie.data.results);
  const data = responseMovie.data.results.map(element => new Movie(element));
  res.json(data);

}
module.exports = getMoviesData;
