require('dotenv').config();
const axios = require('axios');
const Movie= require('../models/Movie');
const MOVIE_API_URL = process.env.MOVIE_API_URL;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

async function getMoviesData (req,res) {
  const responseMovie = await axios.get(`${MOVIE_API_URL}?key=${MOVIE_API_KEY}`);
  res.json(responseMovie);

}
module.exports = getMoviesData;
