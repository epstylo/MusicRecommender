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