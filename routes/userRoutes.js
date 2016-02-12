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
	var from = req.body.from;
	var to = req.body.to;

	// Error checking
	if (from == to) {
		res.json(500, {message: 'Error: A user cannot follow him/herself,' + error});
	}

	User.findOne({_id: from}, function(err, doc) {
		// If user does not already exist.
	    if(!err && !doc) {
	    	// create an entry with user following "to"
	    	var newUser = new User ( {_id : from, follows: [to], listened: [] });
	    	newUser.save(function(err) {
	    		if(!err) {
	    			res.status(200).json({ message: "Follow relationship added."});
	    		} else {
	    			res.status(403).json({message: "Could not insert new follow relationship. " + err});
	    		}
	    	});
	    	// If user already exists
	    } else if(!err) {
	    	var follows = doc.follows;
	    	// If user is not already following "to", update to follow 
	    	if (follows.indexOf(to) == -1) {
	    		doc.follows.push(to);
	    		doc.save(function(err) {
	    			if(!err) {
	    				res.status(200).json({ message: "Follow relationship updated."});
	    			} else {
	    				res.status(403).json({message: "Could not update follow relationship. " + err});
	    			}
	    		});
	    	} else {
	    		res.status(200).json({ message: "Did not add user: ", to});
	    	} 
	    }
	    else {
	    	res.status(403).json({message: "Could not query for follow relationship. " + err});
	    }
	});
}

/**
* POST /listen
* Add one song that the user has just listened to.
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