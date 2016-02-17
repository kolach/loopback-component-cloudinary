var request = require('supertest');
var loopback = require('loopback');
var cloudinary = require('cloudinary');
var path = require('path');

var app = loopback();

var TEST_TAG = 'loopback-component-cloudinary-test';

// expose a rest api
app.use(loopback.rest());

var ds = loopback.createDataSource({
	connector: require('../../lib/cloudinary-connector'),
	config: true
});

var Image = ds.createModel('image', {}, {base: 'Model'});

app.model(Image);

describe('Upload test', function() {
	if (!cloudinary.config().api_secret) {
		return console.warn('**** Please setup environment for uploader test to run!');
	}

	var server = null;

	before(function(done) {
		server = app.listen(5000, function() {
			done();
		});
	});

	after(function() {
		cloudinary.v2.api.delete_resources_by_tag(TEST_TAG);
		server.close();
	});

	it('should upload file', function() {

	});

});
