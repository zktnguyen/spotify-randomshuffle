var app = {};
var apiURL = "https://www.spotify.com/v1";

app.numArtists = 0;
app.getInput = function(){
  $('form').on('submit',function(e){
    e.preventDefault();
    var artists = $('input[type=search]').val();
    artists = artists.split(',');
    app.numArtists = artists.length;
    console.log(artists, app.numArtists);
  });
};

// search for the artists
app.searchForArtistID = function(artist){
  var results = null;
  $.ajax({
    url: apiURL + "/search/",
    method: "GET",
    dataType: "json",
    data: {
      type: 'artist',
      q: artist
    },
    success: function(data){
      results = data;
    }
  });
  return results;
};

app.searchAlbums = function(){

};

// search for tracks by the artist
app.retrieveTracks = function(){

};

// random tracks, split the amount of numArtists
// create the playlist
app.create = function() {

};

// shuffle it
app.shuffle = function(playlist) {

};

// summon the application
app.init = function() {
  app.getInput();
};

$(app.init);
