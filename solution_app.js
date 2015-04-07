var express = require('express');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
  res.render('index');
});

app.get('/search', function(req,res) {
  console.log("\n\n\n\nI AM REQ.QUERY",req.query);
  var urlEndpoint = 'http://www.omdbapi.com?s=';
  var query = req.query.q.split(' ').join('+');

  request(urlEndpoint + query, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      var apiMovies = JSON.parse(body).Search;
      res.render('search', {movies: apiMovies});
    }
  });
});

app.get('/movie', function(req,res) {
  console.log("\n\n\n\nI AM REQ.QUERY",req.query);
  var urlEndpoint = 'http://www.omdbapi.com?i=';
  var query = req.query.id;

  request(urlEndpoint + query, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      var apiMovie = JSON.parse(body);
      res.render('movie', {movie: apiMovie});
    }
  });

});

app.listen(3000);
