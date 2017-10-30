var fs = require('fs');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'A1FZQ6vrLaAVd68iK2G4FfmNM',
    consumer_secret: 'L2bvOYAWb7ipxYCW57vhdft3JojR87e9YM0WE01jv2TSft3ATP',
    access_token_key: '924730217658310657-MBQasioQmRpReE2NqHItBMeQkj0YFiZ',
    access_token_secret: 'TwQsAtaHPgBQREVGlyUlS7o7WuRF3XWd7CzzpSRVIWPvl',
});
/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
// client.get('favorites/list', function(error, tweets, response) {
    var screenName = {screen_name: 'IndependentMeA'};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
      if(!error){
        for(var i = 0; i<tweets.length; i++){
          var date = tweets[i].created_at;
          console.log("ak " + tweets[i].text + " Created At: " + date.substring(0, 19));
          console.log("-----------------------");
          
          //adds text to log.txt file
          fs.appendFile('log.txt', "ak " + tweets[i].text + " Created At: " + date.substring(0, 19));
          fs.appendFile('log.txt', "-----------------------");
        }
      }else{
        console.log('Error occurred');
      }
    });
// });
