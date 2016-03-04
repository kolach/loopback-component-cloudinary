var IncomingForm = require('formidable');
var fs = require('fs');
var path = require('path');

exports.upload = function(cloudinary, req, res, options, cb) {

	var uploadOpts = Object.assign({}, options.upload);

	if (!cb && 'function' === typeof options) {
		cb = options;
		options = {};
	}

	var form = new IncomingForm(options);

	// we do not support multiple files upload currently
	// more tests and more smart work with streams needed
	form.multiples = false;

	var files = [];

	// list of files to upload
	form.on('file', function(name, file) {
		files.push(file);
	});

	form.on('field', function(name, value) {
		switch (name) {
		case 'folder':
			uploadOpts.folder = uploadOpts.folder ? path.join(uploadOpts.folder, value) : value;
			break;

		case 'tags':
			uploadOpts.tags = uploadOpts.tags ? [value, uploadOpts.tags].join() : value;
			break;

		default:
			uploadOpts[name] = value;
		}
	});

	// end request processing and retrun result
	var done = function(error, result) {
		cb && cb(error, result);
	};

	form.parse(req, function(error, fields, _files) {
		if (error) {
			done(error, null);
		} else if (files.length === 0) {
			done(new Error('No files supplied to request'), null);
		} else {
			// create writer stream with given options
			var writer = cloudinary.v2.uploader.upload_stream(uploadOpts, done);
			var reader = fs.createReadStream(files[0].path);

			reader.pipe(writer);
		}
	});
};


