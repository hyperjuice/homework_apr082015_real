var express = require('express');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');

// We have our root route that renders our index view
app.get('/', function(req,res) {
  res.render('index');
});

// We have our search route that renders our search view
app.get('/search', function(req,res) {
  res.render('search', {movies: []});
});

// We have our movie route that renders our movie view
app.get('/movie', function(req,res) {
  res.render('movie', {movie: {Title: "I'm a movie", Plot: "I'm a plot"}});
});

app.listen(3000);
