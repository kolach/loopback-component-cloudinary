var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
var cloudinary = require('cloudinary');
var CloudinaryStorageService = require('../lib/cloudinary-storage-service');

describe('CloudinaryStorageService', function() {

	var cloudinaryStorageService;
	var cloudinaryOptions = {
		cloudName: 'cloud',
		apiKey: 'API_KEY',
		apiSecret: 'API_SECRET'
	};

	beforeEach(function() {
		sinon.spy(cloudinary, 'config');
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

});
