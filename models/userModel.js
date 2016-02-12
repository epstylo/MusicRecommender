var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Class defining the mongoose schema for Users
*
* Note: 
*	- User cannot follow him/herself
*	- Music that is listened by a user will only be included once in the listened list.
*/
var userSchema = new Schema({
    _id : { type: String, required: true, unique : true },
    follows: [{ type: String, ref: "User"}],
    listened: [{ type: String, ref: "Music"}]
});

// Create actual model
var user = mongoose.model('User', userSchema);

module.exports = {
  User: user
};