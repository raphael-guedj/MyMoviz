var express = require("express");
var router = express.Router();

var request = require("sync-request");
var movieData = require("../models/movies");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/new-movies", function (req, res, next) {
  var movie = request(
    "GET",
    `https://api.themoviedb.org/3/discover/movie?api_key=475ac541e33edfee0d7729ab2fcd8119&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2020&
    append_to_response=images&include_image_language=fr,null`
  );
  movie = JSON.parse(movie.body);
  // console.log(movie);
  res.json({ movie });
});

router.post("/wishlist-movie", async function (req, res, next) {
  var movie = new movieData({
    image: req.body.image,
    movieName: req.body.name,
  });

  var movieSaved = await movie.save();
  res.json({ result: true, movieSaved });
});

router.delete("/wishlist-movie/:name", async function (req, res, next) {
  var deleteMovie = await movieData.deleteOne({ movieName: req.params.name });
  console.log(req.params.name);
  res.json({ result: true, deleteMovie });
});

router.get("/wishlist-movie", async function (req, res, next) {
  var listMovie = await movieData.find();
  res.json({ result: true, listMovie });
});

module.exports = router;
