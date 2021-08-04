class Forecast{
  constructor(object){
    this.date = object.datetime;
    this.description = object.description;
  }
}
module.exports = Forecast;
