class Weather{
  constructor(values){
    this.date = values.valid_date;
    this.description = values.weather.description;
  }
}
module.exports= Weather;