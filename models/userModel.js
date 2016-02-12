var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Music = require('mongoose').model('Music').schema;

/**
* Class defining the mongoose schema for Users
*/

var userSchema = new Schema({
    _id : { type: String, required: true },
    follows: [{ type: String, ref: "User"}],
    listened: [Music]
});

// Create actual model
var user = mongoose.model('User', userSchema);

module.exports = {
  User: user
};