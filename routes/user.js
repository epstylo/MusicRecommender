var User = require('../models/userModel').User;

/** 
*	Query to return all users.
*	Used for testing purposes
*/
exports.findAllUsers = function(req, res) {
  User.find({}, function(err, docs) {
    if(!err) {
      res.status(200).json({ users: docs });
    } else {
      res.status(500).json({ message: err});
    }
  });
}