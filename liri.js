var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys.js");


let action = process.argv[2];
let songTitle = process.argv[3];
switch (action) {

  // Gets list of tweets.
  case "my-tweets":
    myTweets();
    break;
  
  // Gets song information.
  case "spotify-this-song":
    spotify(songTitle);
    break;

  // Gets movie information.
  case "movie-this":
    movieChoice();
    break;

  // Gets text inside file and uses that info to execute
  case "do-what-it-says":
  rand();
  break;

  default:
    console.log("To begin, add a parameter: " + '\n' +
      "my-tweets" + '\n' +
      "spotify-this-song ('song title in quotes')" + '\n' +
      "movie-this ('movie title in quotes')" + '\n' +
      "do-what-it-says")
};

function myTweets() {
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  var params = {
    screen_name: 'terrycrews',
    count: 20
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          // console.log(tweets);
      }
      for (var i = 0; i < tweets.length; i++) {
        var tweetDisplay = tweets[i].text + " " + tweets[i].created_at;
        console.log(tweetDisplay);
      }
  })
};

function spotify(songTitle) {
  // let songName = process.argv[3]
  var spotify = new Spotify({
    id: "4545a292714a4e9aaab77183c922d1d1",
    secret: "cc773f24ed9146318df99f90e012dbdd"
  });
  spotify.search({type: 'track', query: songTitle}, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    const artist = "Artist: " + data.tracks.items[0].album.artists[0].name;
    const title = "Title: " + data.tracks.items[0].name;
    const album = "Album: " + data.tracks.items[0].album.name;
    const preview = "Preview: " + data.tracks.items[0].preview_url;
    // console.log(data);
    console.log(artist + "\n" + title + "\n" + album + "\n" + preview);
  });
}

function movieChoice() {
  let movieName = process.argv[3];
  // Query URL and outputting JSON into console
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieInfo = JSON.parse(body)
      console.log("Title: " + movieInfo.Title);
      console.log("Year: " + movieInfo.Year);
      console.log("IMDB Rating: " + movieInfo.imdbRating);
      console.log("Country: " + movieInfo.Country);
      console.log("Language: " + movieInfo.Language);
      console.log("Synopsis: " + movieInfo.Plot);
      console.log("Actors: " + movieInfo.Actors);
    }
  })
};

function rand() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    songTitle = data;
    spotify(songTitle);
  });
}