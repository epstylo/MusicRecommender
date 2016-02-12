var User = require('../models/userModel').User;

/**
* POST /listen
* Add one song that the user has just listened to.
*   user: <user ID>
*   music: <music ID>
*/
exports.listenToMusic = function(req, res) {
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