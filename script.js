var app = {};
var apiURL = "https://api.spotify.com/v1";

app.numArtists = 0;
app.playlistSize = 0;
app.tracklist=[];
app.created = false;
app.getInput = function(){
  $('form').on('submit',function(e){
    e.preventDefault();
    var artists = $('input[id=searchForArtists]').val().split(',');
    app.playlistSize = $('input[id=maxSize]').val();
    app.getInfo(artists);
  });
};

app.getInfo = function(artists){
  artists = artists.map(app.getID);

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
    url: apiURL + "/artists/" + artist + "/albums",
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
    app.tracklist.push(song);
  });
};

app.shuffle = function(playlist){
  for (var i = 0; i < playlist.length; i++){
    var j = Math.floor(Math.random() * playlist.length);
    var temp = playlist[i];
    playlist[i] = playlist[j];
    playlist[j] = temp;
  }
  return playlist;
};

app.sortByArtist = function(playlist){

};

app.sortBySong = function(playlist){

};

app.sortByDate = function(playlist){

};

// random tracks, split the amount of numArtists
// create the playlist
app.create = function() {
  var randomPlaylist = [];
  var size = 0;
  if (app.playlistSize > app.tracklist.length) size = app.tracklist.length;
  else size = app.playlistSize;
  for (var i = 0; i < size; i++){
    var randomIndex = Math.floor(Math.random() * app.tracklist.length);
    while ($.inArray(app.tracklist[randomIndex], randomPlaylist) >= 0){
      randomIndex = Math.floor(Math.random() * app.tracklist.length);
    }
    randomPlaylist.push(app.tracklist[randomIndex]);
  }
  var baseURL = 'https://embed.spotify.com/?theme=white&uri=spotify:trackset:My Playlist:';
  randomPlaylist = app.shuffle(randomPlaylist);
  randomPlaylist = randomPlaylist.map(song => song.id).join(',');
  var embedPlaylist = "<iframe src='" + baseURL + randomPlaylist + "' height='400'></iframe>";
  $('#playlist').empty();
  $('#playlist').append(embedPlaylist);
};

// summon the application
app.init = function() {
  app.getInput();
  $(document).ajaxStop(function(){
    app.create();
    app.tracklist = [];
  });

};

$('form').on('reset', function(e){
  e.preventDefault();
  $('input[id=searchForArtists]').val('');
  $('input[id=maxSize]').val(0);
});

$(app.init);
