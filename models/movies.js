var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  image: String,
  movieName: String,
});

var movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;
