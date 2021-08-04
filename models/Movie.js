class Movie{
  constructor(data){
    this.title = data.title;
    this.overview = data.overview;
    this.average_votes = data.average_votes;
    this.total_votes = data.total_votes;
    this.image_url = data.image_url;
    this.popularity = data.popularity;
    this.released_on = data.released_on;

  }
}
module.exports = Movie;

