var IncomingForm = require('formidable');
var fs = require('fs');

exports.upload = function(cloudinary, req, res, options, cb) {
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

	// end request processing and retrun result
	function end(error, result) {
		cb && cb(error, result);
	}

	form.parse(req, function(error, fields, _files) {
		if (error) {
			end(error, null);
		} else if (files.length === 0) {
			end(new Error('No files supplied to request'), null);
		} else {
			var writer = cloudinary.uploader.upload_stream(function(result) {
				end(result.error, result, cb);
			}, fields);
			var reader = fs.createReadStream(files[0].path);

			reader.pipe(writer);
		}
	});
};


