var userSearch = '';
var selection = document.getElementById("selection");
var searchResults = document.getElementById('search-results');
var myLibrary = document.getElementById('my-library');
var searchType = document.getElementById('resultType');


document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault();
  var userInput = document.getElementById("searchbar").value;
  document.getElementById("searchbar").value = '';
  userSearch = userInput.replace(/ /g,"_");
  searchResults.innerHTML = '';

  if (selection.value == "byLyrics") {
    var apikey = "4a108961639704b98c6cb459f88e8e82";
    var params = "?q_lyrics=" + userSearch + "&page_size=3&page=1&s_track_rating=desc&apikey=" + apikey;
    var apiURL = "http://api.musixmatch.com/ws/1.1/track.search";
    var apiURLAndParams = apiURL + encodeURIComponent(params);
    var urlWithProxy = "https://octoproxymus.herokuapp.com?secret=walrus&url=" + apiURLAndParams;
  
    fetch(urlWithProxy)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var song = data['message'].body.track_list[0].track.track_name;
        var artist = data['message'].body.track_list[0].track.artist_name;
        var songLi = document.createElement('li');
        //make default li item dissapear
        document.getElementById('initialLi').setAttribute("style", "display:none;");
        //create li element to display current search result in myLibrary
        var li = document.createElement('li');
        var hr = document.createElement('hr');
        li.innerText = 'Song: "' + song + '" by ' + artist;
        //show results in search results section
        songLi.innerText = 'Song: "' + song + '" by ' + artist;
        resultType.innerText = "Song & Artist:"
        //append both li items to respective spots
        searchResults.appendChild(songLi);
        myLibrary.appendChild(li);
        myLibrary.appendChild(hr);
        // save song and artist to localstorage
        var savedSearches = localStorage.getItem("songs");
        if (!savedSearches) {
          localStorage.setItem("songs", JSON.stringify([{song: song, artist: artist}]));
          return;
        }
        savedSearches = JSON.parse(savedSearches);
        savedSearches.push({song: song, artist: artist});
        localStorage.setItem("songs", JSON.stringify(savedSearches));
      });
  }

    if (selection.value == "byArtist") {  
    fetch("https://theaudiodb.com/api/v1/json/2/search.php?s=" + encodeURI(userSearch))
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var artists = data["artists"];
        var artist = artists[0].strArtist;
        var genre = artists[0].strGenre;
        var artistLi = document.createElement('li');
        var genreLi = document.createElement('li');
        resultType.innerText = "Artist & Genre:"
        artistLi.innerText = 'Artist: ' + artist;
        genreLi.innerText = "Genre: " + genre;
        searchResults.appendChild(artistLi);
        searchResults.appendChild(genreLi);
        //make default li item dissapear
        document.getElementById('initialLi').setAttribute("style", "display:none;");
        //create li element to display current search result in myLibrary
        var li = document.createElement('li');
        var hr = document.createElement('hr');
        li.innerText = 'Artist: ' + artist + ' - Genre: ' + genre;
        //append li items to myLibrary
        myLibrary.appendChild(li);
        myLibrary.appendChild(hr);
        //save artist and genre to localstorage
        var savedArtist = localStorage.getItem("artists");
        if (!savedArtist) {
          localStorage.setItem("artists", JSON.stringify([{artist: artist, genre: genre}]));
          return;
        }
        savedArtist = JSON.parse(savedArtist);
        savedArtist.push({artist: artist, genre: genre});
        localStorage.setItem("artists", JSON.stringify(savedArtist));
    });
  }
});

function displayLibrary() {
  var savedSearches = localStorage.getItem("songs");
  var savedArtist = localStorage.getItem("artists");
  savedSearches = JSON.parse(savedSearches);
  savedArtist = JSON.parse(savedArtist);
  if (savedSearches) {
    document.getElementById('initialLi').setAttribute("style", "display: none;");
    for (var i=0; i < savedSearches.length; i++) {
      var li = document.createElement('li');
      var hr = document.createElement('hr');
      li.innerText = 'Song: "' + savedSearches[i].song + '" by: ' + savedSearches[i].artist;
      myLibrary.appendChild(li);
      myLibrary.appendChild(hr);
    }
  }

  if (savedArtist) {
    document.getElementById('initialLi').setAttribute("style", "display: none;");
    for (var i=0; i < savedArtist.length; i++) {
      var li = document.createElement('li');
      var hr = document.createElement('hr');
      li.innerText = 'Artist: ' + savedArtist[i].artist + ' - Genre: ' + savedArtist[i].genre;
      myLibrary.appendChild(li);
      myLibrary.appendChild(hr);
    }
  }

}


displayLibrary();