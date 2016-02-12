var musicJson = require('../json_files/music.json');
var Music = require('../models/musicModel').Music;
var musicRoutes = require('../routes/music');

// Utility helper class for database operations

/** Initialize the mongodb by loading in music.json
* 		(a) Parse the json and extract the 
*			(i) music id
*			(ii) list of genres
*		(b) Insert each music element to the Music collection
*	Example entry: {"m1" : ["jazz","old school", "instrumental"]}
*/
exports.initializeDB = function() {  
	var listOfMusic = JSON.parse(JSON.stringify(musicJson));

	for (var key in listOfMusic) {
		musicRoutes.insertMusic(key, listOfMusic[key]);
	};
}