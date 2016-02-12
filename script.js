var assert = require('assert');
var request = require('supertest')
var app = require('./app');
var async = require('async');
var followRoute = require('./routes/follow');
var listenRoute = require('./routes/listen');
var followsJson = require('./json_files/follows.json');
var listenJson = require('./json_files/listen.json');

describe('GetRecommendations', function () {
	var follows;
	var listenJson;

	before(function () {
		follows = JSON.parse(JSON.stringify(followsJson))['operations'];
		listenJson = JSON.parse(JSON.stringify(followsJson))['userIds'];
    });

	describe('Load: Follows relationship', function() {
		it('Load follows.json', function(done) {
			async.each(follows, 
				function(follow, callback) {
					console.log(follow[0]);
					request(app)
					.post('/follow')
					.send({ from: follow[0], to: follow[1] })
					.end(callback);
				}, function(err) {
					if (err) {
						console.log("There was an error while loading follows.json");
					} else {
						done();
					}
				}
			);	
		});
	})
})
			
	// 	})
	// });
	// describe('Load: Listen relationship', function() {
	// 	it('Load listens.json', function(done) {
	// 		for (var key in listenJson) {
	// 			var listOfMusic = listenJson[key];
	// 			// Music is supplied as an array of musicId so load all songs for each user.
	// 			listOfMusic.forEach(function (entry) {
	// 				request(app)
	// 				.post('/listen')
	// 				.send({user: key, music: entry})
	// 				.expect(200)
	// 				.end(done);
	// 			});
	// 		};
	// 		done();
	// 	})
	// });

	// TODO: Complete implementation of recommendations endpoint.
	// describe('Get recommendations for User A', function() {
	// 	it('Run getRecommendations algorithm', function(done) {
	// 		http.get(musicUrl, function (res) {
	//     		assert.equal(200, res.statusCode);
	//       		done();
	// 		})
	// 	})
	// });

	// TODO: Cleanup data entries after running the script.
	// after(function () {
	// 	cleanUpDataEntries();
 	//    });
// });