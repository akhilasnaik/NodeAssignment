// At the top of the liri.js file, write the code you need to grab the data from keys.js. 
// Then store the keys in a variable.
var fs = require('fs');
var request = require("request");
var twitter = require('twitter');
var keys = require("./keys.js");
var client = new twitter(keys.twitterKeys); 

var Spotify = require('node-spotify-api');

// var spotifynew = new spotify(keys.spotifyKeys);
var action =  process.argv[2]; 
// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
// Make it so liri.js can take in one of the following commands:
// my-tweets // spotify-this-song // movie-this // do-what-it-says
 
switch (action) {
  case "my-tweets": twee();
  console.log("test 1");
  break;
 
  case "spotify-this-song" :spotifysong();
  console.log("spotify tested");
  break;

  case "movie-this" : movie();
  console.log("Tested Movie");
  break;

  case "do-what-it-says" : doyou();
  console.log("Do do dooooo");
  break;
}

function twee() {
    console.log("test twee function");
    var screenName = {screen_name: 'IndependentMeA'};
    console.log(screenName);
        client.get('statuses/user_timeline', screenName, function(error, tweets, response){
          if(!error){
            for(var i = 0; i<tweets.length; i++){
              var date = tweets[i].created_at;
              console.log("ak " + tweets[i].text + " Created At: " + date.substring(0, 19));
              console.log("-----------------------");
              
              //adds text to log.txt file
              fs.appendFile('log.txt', "ak " + tweets[i].text + " Created At: " + date.substring(0, 19) + "\n");
              fs.appendFile('log.txt', "-----------------------/n");
            }
          }else{
            console.log('Error occurred');
          }
        });
}   

function spotifysong() { // "spotify-this-song"
    console.log("testing spotify function");
    var spotify = new Spotify({
        id: '1e27f0b6d62045618501283936b0c8c5',
        secret: 'ef7b6f3b756e4a3d9eaae2ccd093639c'
    });

        spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if(!err){
            for(var i = 0; i < data.tracks.items.length; i+=10){
               
            var songData = data.tracks.items[i];
            //artist
            console.log("Artist: " + songData.artists[0].name);
            //song name
            console.log("Song: " + songData.name);
            //spotify preview link
            console.log("Preview URL: " + songData.preview_url);
            //album name
            console.log("Album: " + songData.album.name);
            
            
            //adds text to log.txt
            fs.appendFile('log.txt', songData.artists[0].name +"\n");
            console.log("-----------------------");
            fs.appendFile('log.txt', songData.name + "\n");
            console.log("-----------------------");
            fs.appendFile('log.txt', songData.preview_url +"\n");
            console.log("-----------------------");
            fs.appendFile('log.txt', songData.album.name)+"\n" ; 
            console.log("-----------------------");
            }
        } else{
            console.log('Error occurred.' + err);
            }
        });
    }          
function movie(){ //movie-this
    console.log("testing movie function");
    var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
        // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
          // If the request is successful
      if (!error && response.statusCode === 200) {
    
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Release Year: " + JSON.parse(body).Year); //* Year the movie came out.
        console.log("Movie Title: " + JSON.parse(body).Title);//* Title of the movie.
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);//* Rotten Tomatoes Rating of the movie.
        console.log("Country: " + JSON.parse(body).Country); //* Country where the movie was produced.
        console.log("Ratings " + JSON.parse(body).imdbRating); // * IMDB Rating of the movie.
        console.log("Language: " + JSON.parse(body).Language); //* Language of the movie.
        console.log("---------------------- \n");  
        console.log("Plot: " + JSON.parse(body).Plot); //* Plot of the movie.
        console.log("---------------------- \n"); 
        console.log("Actors: " + JSON.parse(body).Actors);//* Actors in the movie.


        
      }
      else {
          console.log("Error" +error);
      }
      if ( movie === "Mr.Nobody"){
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
      }
    });
}

function doyou(){ //"do-what-it-says"
    console.log("testing do you function");
}