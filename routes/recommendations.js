var User = require('../models/userModel').User;

/** 
* GET /recommendations
*
* user: <user ID>
* 
* Returns list of <= 5 songs based on
*		(a) What music they heard before.
*		(b) The users being followed
*		(c) Maximize discovery for new songs
*				- Don't recommend songs that have already been listened to
*/
exports.getRecommendations = function(req, res) {
}