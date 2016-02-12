var http = require('http');
var assert = require('assert');
// Default localhost port.
var port = 3000;
var urlPrefix = 'http://localhost:' + port;
var fakeUrl = urlPrefix + '/asdfasdf';
var userUrl = urlPrefix + '/user';
var musicUrl = urlPrefix + '/music';

/**
* Test class to test basic http requests.
*/

describe('server test', function () {
	describe('/asdfasdf', function() {
		it('Get request to fake url should return 200', function(done) {
			http.get(fakeUrl, function (res) {
	    		assert.equal(404, res.statusCode);
	      		done();
			})
		})
	});
	describe('/user', function() {
		it('Get request to /user should return 200', function(done) {
			http.get(userUrl, function (res) {
	    		assert.equal(200, res.statusCode);
	      		done();
			})
		})
	});
	describe('/music', function() {
		it('Get request to /music should return 200', function(done) {
			http.get(musicUrl, function (res) {
	    		assert.equal(200, res.statusCode);
	      		done();
			})
		})
	});
});