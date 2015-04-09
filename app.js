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
  var queryParams = req.query.q;
  var url = "http://www.omdbapi.com?s="+queryParams;
  request(url, function(err,resp,body){
  	if (!err && resp.statusCode === 200) {
  		var jsonData = JSON.parse(body);
  		res.render('search', { movies: jsonData.Search});
  	}
  });
});

// We have our movie route that renders our movie view
app.get('/movie', function(req,res) {
	var imdbID = req.query.id;
	var url = "http://www.omdbapi.com?i="+imdbID;
	request(url, function(err,resp,body) {
		if (!err && resp.statusCode === 200) {
			var movieData = JSON.parse(body);
			res.render('movie', {movie: movieData});
		}
	});
});

app.listen(3000, function() {
  console.log('I am listening');
});
