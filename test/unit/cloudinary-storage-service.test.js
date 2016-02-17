var cloudinary = require('cloudinary');
var CloudinaryStorageService = require('../../lib/cloudinary-storage-service');
var handler = require('../../lib/cloudinary-handler');

describe('CloudinaryStorageService', function() {

	var cloudinaryStorageService;

	beforeEach(function() {
		spy(cloudinary, 'config');
		cloudinaryStorageService = new CloudinaryStorageService({config: cloudinaryConfig});
	});

	afterEach(function() {
		cloudinary.config.restore();
	});

	it('should configure cloudinary service', function() {
		cloudinary.config.should.have.been.calledWith(cloudinaryConfig);
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

		it('should be shared', function() {
			cloudinaryStorageService.upload.shared.should.be.equal(true);
		});

	});

});
