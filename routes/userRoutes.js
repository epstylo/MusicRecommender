var User = require('../models/userModel').User;

// Query the collection of users.
// Return all users.
exports.findAllUsers = function(req, res) {
  User.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { users: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}

/** 
* POST /follow
* Add one follows relationship.
*   from: <user ID>
*   to: <user ID>
*/
exports.follow = function(req, res) {
}

/**
* POST /listen
* Add one song as the user has just listened.
*   user: <user ID>
*   music: <music ID>
*/
exports.listen = function(req, res) {
}

/** 
* GET /recommendations
*/
exports.getRecommendations = function(req, res) {
}