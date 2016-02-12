var User = require('../models/userModel').User;

/** 
* POST /follow
* Add one follows relationship.
*   from: <user ID>
*   to: <user ID>
*/
exports.followUser = function(req, res) {
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