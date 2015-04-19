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
  // + means, the queryParams is added to the "xxxxxx"
  request(url, function(err,resp,body){
  	if (!err && resp.statusCode === 200) {
  		var jsonData = JSON.parse(body);
  		res.render('search', { movies: jsonData.Search} // .Search is capitalized bc that's how it's done in the omdB response
  		// 'movies' will be used on the search page, to display it	
  		);
  	}
  });
});

// We have our movie route that renders our movie view
app.get('/movie', function(req,res) {
	var imdbID = req.query.id;
	var url = "http://www.omdbapi.com?i="+imdbID;
	request(url, function(err,resp,body) {
		if (!err && resp.statusCode === 200) {
// if u don't do the 'if', u could get an error if there is a prob w/omdB server, and then ull get an error returned/displayed. This statment prevents this possibility.

			var movieData = JSON.parse(body);
			res.render('movie', {movie: movieData});
						// 1st, test the ejs with {movie: {Plot: "I'm plot", Title: "I'm a title"}}
						// so Line 34 says, on the movie view, in the Plot and Title spots, put "I'm a plot" and "I'm a title". And the finished Line 34 says to fill it with actual results from the omdB request.
		}
	});					
});

app.listen(3000, function() {
  console.log('I am listening');
});
