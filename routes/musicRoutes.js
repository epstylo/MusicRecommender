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

// Insert music to the collection
// 1) Check for duplicates.
// 2) If no duplicate, save.
exports.insertMusic = function(req, res) {
  
}