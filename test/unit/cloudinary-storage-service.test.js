var cloudinary = require('cloudinary');
var CloudinaryStorageService = require('../../lib/cloudinary-storage-service');
var handler = require('../../lib/cloudinary-handler');

describe('CloudinaryStorageService', function() {

	var cloudinaryStorageService;
	var UPLOAD_FOLDER = 'tmp';
	var UPLOAD_TAG1 = 'test1';
	var UPLOAD_TAG2 = 'test2';
	var UPLOAD_TAGS = [UPLOAD_TAG1, UPLOAD_TAG2].join();
	var uploadConfig = {tags: UPLOAD_TAGS, folder: UPLOAD_FOLDER};

	beforeEach(function() {
		spy(cloudinary, 'config');
		cloudinaryStorageService = new CloudinaryStorageService({
			config: cloudinaryConfig,
			upload: uploadConfig
		});
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
			options.upload.should.be.equal(uploadConfig);

			handler.upload.restore();
		});

		it('should be shared', function() {
			cloudinaryStorageService.upload.shared.should.be.equal(true);
		});

	});

});
