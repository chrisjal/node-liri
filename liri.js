var fs = require("fs");

fs.readFile("keys.js", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
    }
    console.log(data);
});

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

// var client = new Twitter({
//     consumer_key: '',
//     consumer_secret: '',
//     access_token_key: '',
//     access_token_secret: ''
// });

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//         console.log(tweets);
//     }
// });

var spotify = new Spotify({
    id: "4545a292714a4e9aaab77183c922d1d1",
    secret: "cc773f24ed9146318df99f90e012dbdd"
});
// spotify.search({type: 'track', query: 'All the Small Things'}, function(err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }
//     console.log(data); 
// });

request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
    if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    }
});