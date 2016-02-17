var cloudinary = require('cloudinary');
var CloudinaryStorageService = require('../lib/cloudinary-storage-service');
var handler = require('../lib/cloudinary-handler');

describe('CloudinaryStorageService', function() {

	var cloudinaryStorageService;
	var cloudinaryOptions = {
		cloudName: 'cloud',
		apiKey: 'API_KEY',
		apiSecret: 'API_SECRET'
	};

	beforeEach(function() {
		spy(cloudinary, 'config');
		cloudinaryStorageService = new CloudinaryStorageService(cloudinaryOptions);
	});

	afterEach(function() {
		cloudinary.config.restore();
	});

	it('should configure cloudinary service', function() {
		cloudinary.config.should.have.been.calledWith({
			'cloud_name': cloudinaryOptions.cloudName,
			'api_key': cloudinaryOptions.apiKey,
			'api_secret': cloudinaryOptions.apiSecret
		});
	});

	describe('#upload(req, res, options, cb)', function() {

		it('should call handler.upload(cloudinary, req, res, options, cb)', function() {
			stub(handler, 'upload').returns(true);

			var req = {a: 1};
			var res = {b: 2};
			var options = {c: 3};

			function cb() {}

			cloudinaryStorageService.upload(req, res, options, cb);
			handler.upload.should.be.calledWith(cloudinary, req, res, options, cb);

			handler.upload.restore();
		});

	});

});
