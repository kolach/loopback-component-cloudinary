var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var localConfigFile = path.join(__dirname, 'cloudinary.local.json');
var config = {};

if (fs.existsSync(localConfigFile)) {
	config = require(localConfigFile);
}


config = _.merge(config, {
	'cloud_name': process.env.CLOUDINARY_CLOUD_NAME,
	'api_key': process.env.CLOUDINARY_API_KEY,
	'api_secret': process.env.CLOUDINARY_API_SECRET
});

module.exports = config;
