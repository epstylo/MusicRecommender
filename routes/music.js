var Music = require('../models/musicModel').Music;

// Query the music collection and return all music available.
exports.findAllMusic = function(req, res) {
  Music.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { music: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}

/** 
* Insert music to the collection
*   1) Check for duplicates.
*   2) If no duplicate, save.
*/
exports.insertMusic = function(musicId, genres) {
  // Check for duplicates
  Music.findOne({_id: musicId}, function(err, doc) {
    // If no duplicates or errors, insert entry.
    if(!err && !doc) {
      var newMusic = new Music( {_id : musicId, 
                                genres: genres});
      newMusic.save(function(err) {
        if(!err) {
          console.log('Music entry inserted: ' + musicId);
          } else {
            console.log('Error while saving music: ' + musicId + ' to db during initialization');
          }
      });
    } else if(!err) {
        // Music already exists
        console.log('Music with that id already exists: ' + musicId);
      } else {
        console.log('Error while checking for music duplicates during initialization; musicId: ' + musicId);
    }
  });   
}