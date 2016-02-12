var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Class defining the mongoose schema for Music
*/

var musicSchema = new Schema({
    _id : { type: String },
    genres: [{ type: String, required: true, trim: true }]
});

// Create actual model
var music = mongoose.model('Music', musicSchema);

module.exports = {
  Music: music
};