var handler = require('./cloudinary-handler');
var cloudinary = require('cloudinary');

module.exports = CloudinaryStorageService;

function CloudinaryStorageService(options) {
	if (!(this instanceof CloudinaryStorageService)) {
		return new CloudinaryStorageService(options);
	}
	this.options = options;
	cloudinary.config(options.config);
}

CloudinaryStorageService.prototype.upload = function(req, res, options, cb) {
	if (this.options.upload) {
		options.upload = this.options.upload;
	}
	return handler.upload(cloudinary, req, res, options, cb);
};

CloudinaryStorageService.prototype.upload.shared = true;
CloudinaryStorageService.prototype.upload.accepts = [
	{arg: 'req', type: 'object', 'http': {source: 'req'}},
	{arg: 'res', type: 'object', 'http': {source: 'res'}}
];
CloudinaryStorageService.prototype.upload.returns = {arg: 'result', type: 'object'};
CloudinaryStorageService.prototype.upload.http =
{verb: 'post', path: '/upload'};
