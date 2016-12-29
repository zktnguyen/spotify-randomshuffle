var app = {};
var apiURL = "https://api.spotify.com/v1";

app.numArtists = 0;
app.playlistSize = 0;
app.tracklist=[];
app.getInput = function(){
  $('form').on('submit',function(e){
    e.preventDefault();
    var artists = $('input[id=searchForArtists]').val().split(',');
    app.playlistSize = $('input[id=maxSize]').val();
    app.getInfo(artists);
  });
};

app.getInfo = function(artists){
  artists.map(app.getID);
};

app.getID = function(artist){
  $.ajax({
    url: apiURL + "/search/",
    method: "GET",
    dataType: "json",
    data: {
      type: 'artist',
      q: artist
    },
    success: function(data){
      app.searchAlbum(data.artists.items[0].id);
    }
  });

};

// search for the albums

app.searchAlbum = function(artist){
  $.ajax({
    url: apiURL + "/artists/" + artist + "/albums" ,
    method: "GET",
    dataType: "json",
    data: {
      album_type: 'album'
    },
    success: function(data){
      app.retrieveTracks(data);
    }
  });
};

// search for tracks by the artist
app.retrieveTracks = function(albums){
  albums.items.forEach(function(album){
    $.ajax({
      url: apiURL + '/albums/' + album.id + '/tracks',
      method: 'GET',
      dataType: "json",
      success: function(data){
        app.createTrackList(data.items);
      }
    });
  });

};

app.createTrackList = function(data){
  data.forEach(function(song){
    app.tracklist.push(song.id);
  });
  //console.log(app.tracklist.length);
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
