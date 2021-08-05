class Movie{
  constructor(object){
    this.title = object.title;
    this.overview = object.overview;
    this.average_votes = object.average_votes;
    this.total_votes = object.total_votes;
    this.image_url = 'https://image.tmdb.org/t/p/w500'+object.poster_path;
    this.popularity = object.popularity;
    this.released_on = object.released_on;
  }

}
module.exports = Movie;
