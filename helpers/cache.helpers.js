class Cache {
  constructor(data) {
    this.forecast = [];
    this.movies = [];
    this.timeStamp = Date.now();
  }
}

module.exports = Cache;
