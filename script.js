// var artist = prompt("Please enter artist name")

// fetch("https://theaudiodb.com/api/v1/json/2/search.php?s=" + artist)
// .then(function(response) {
//     return response.json();
// })
// .then(function(data) {
//     var artists = data["artists"]
//     console.log(artists);
//     console.log(artists[0].strGenre);
// });

var apikey = "4a108961639704b98c6cb459f88e8e82";

fetch("http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc&apikey=" + apikey)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
})