var request = require('supertest');
var loopback = require('loopback');
var cloudinary = require('cloudinary');
var path = require('path');
var uuid = require('uuid');

var app = loopback();

app.set('legacyExplorer', false);

var TEST_TAG = process.env.CLOUDINARY_TEST_TAG || 'loopback-component-cloudinary-test';
var TEST_FOLDER = 'test';

// expose a rest api
app.use(loopback.rest());

var ds = loopback.createDataSource({
	connector: require('../../lib/cloudinary-connector'),
	config: cloudinaryConfig
});

var Image = ds.createModel('image', {}, {base: 'Model'});

app.model(Image);

describe('Upload test', function() {
	if (!cloudinary.config().api_secret) {
		return console.warn('**** Please setup environment for uploader test to run!');
	}

	var server = null;

	before(function(done) {
		server = app.listen(3000, function() {
			done();
		});
	});

	after(function(done) {
		cloudinary.v2.api.delete_resources_by_tag(TEST_TAG, function(error, result) {
			if (error) { console.error('Error removing resources:', error); }
			done();
		});
		server.close();
	});

	it('should upload file', function(done) {
		var publicId = uuid.v4();

		request('http://localhost:3000')
			.post('/images/upload')
			.field('tags', TEST_TAG)
			.field('folder', TEST_FOLDER)
			.field('public_id', publicId)
			.attach('image', path.join(__dirname, '../fixtures/image.png'))
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, function(err, res) {
				should.not.exist(err);
				var result = res.body.result;

				result.should.have.property('public_id', path.join(TEST_FOLDER, publicId));
				result.should.have.property('resource_type', 'image');
				result.should.have.property('type', 'upload');
				result.should.have.deep.property('tags[0]', TEST_TAG);
				done();
			});
	});

});
