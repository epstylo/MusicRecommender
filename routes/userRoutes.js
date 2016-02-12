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
	    			res.status(200).json({ message: "Added new follower."});
	    		} else {
	    			res.status(403).json({message: "Could not add new follower" + err});
	    		}
	    	});
	    	// If user already exists
	    } else if(!err) {
	    	// If user is not already following "to", update to follow 
	    	if (doc.follows.indexOf(to) == -1) {
	    		doc.follows.push(to);
	    		doc.save(function(err) {
	    			if(!err) {
	    				res.status(200).json({ message: "Updated list of followees."});
	    			} else {
	    				res.status(403).json({message: "Could not update list of followees" + err});
	    			}
	    		});
	    	} else {
	    		res.status(200).json({ message: "Did not add user: " + to});
	    	} 
	    }
	    else {
	    	res.status(403).json({message: "Error occured while searching for user. " + err});
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
	var user = req.body.user;
	var music = req.body.music;

	User.findOne({_id: user}, function(err, doc) {
		// If user does not exist, don't do anything.
	    if(!err && !doc) {
	    	res.status(403).json({ message: "User attempting to listen does not exist"});
	    	// If user exists
	    } else if(!err) {
	    	// If user has not listened to this song before, update to include.
	    	if (doc.listened.indexOf(music) == -1) {
	    		doc.listened.push(music);
	    		doc.save(function(err) {
	    			if(!err) {
	    				res.status(200).json({ message: "Music list updated to include user/music: " + user + "/" + music});
	    			} else {
	    				res.status(403).json({message: "Database error while updating music list for user/music: " + user + "/" + music + ", " + err});
	    			}
	    		});
	    	} else {
	    		res.status(200).json({ message: "User has already listened to the song user/music: " + user + "/" + music });
	    	} 
	    }
	    else {
	    	res.status(403).json({message: "Error occured while searching for user. " + err});
	    }
	});
}

/** 
* GET /recommendations
*/
exports.getRecommendations = function(req, res) {
}