
//test fetch to search for any artist using a prompt -- even though I know we're not supposed to use prompts lol 
var artist = prompt("Please enter artist name")

fetch("https://theaudiodb.com/api/v1/json/2/search.php?s=" + artist)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    var artists = data["artists"]
    console.log(artists);
    console.log(artists[0].strGenre);
});


//test fetch to search for any lyrics user inputs
var inputLyrics = prompt("Please enter lyrics to search for");
//line 19 replaces spaces with underscores but I don't think we actually need to manually do that
// inputLyrics = inputLyrics.replace(/ /g,"_");
var apikey = "4a108961639704b98c6cb459f88e8e82";
var params = "?q_lyrics=" + inputLyrics + "&page_size=3&page=1&s_track_rating=desc&apikey=" + apikey
var apiURL = "http://api.musixmatch.com/ws/1.1/track.search" 
var apiURLAndParams = apiURL + encodeURIComponent(params)
var urlWithProxy = "https://octoproxymus.herokuapp.com?secret=walrus&url=" + apiURLAndParams

fetch(urlWithProxy)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data);
    var test = data['message'].body.track_list[0].track.track_name;
    console.log(test);
  })