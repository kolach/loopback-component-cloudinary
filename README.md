# Loopback Component Cloudinary

[![Circle CI](https://circleci.com/gh/kolach/loopback-component-cloudinary.svg?style=svg)](https://circleci.com/gh/kolach/loopback-component-cloudinary)

A small loopback component that acts as a cloudinary datasource.
Only image upload is supported is supported currently.

## Installation and Usage

```
npm install loopback-component-cloudinary
```

Generate an image model:

image.js
```
module.exports = function(Image) {
};
```

image.json
```
{
  "name": "Image",
  "plural": "images",
  "base": "Model",
  "options": {},
  "properties": {},
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

Add cloudinary datasource

datasource.json
```
{
  "cloudinary": {
    "name": "cloudinary",
    "connector": "@kolach/loopback-component-cloudinary",
		"config": {
			"cloud_name": "your_cloud_name",
			"api_key": "your_api_key",
			"api_secret": "your_api_secret"
		}
  }
}
```

Optionally define upload default parameters:
```
{
  "cloudinary": {
    "name": "cloudinary",
    "connector": "@kolach/loopback-component-cloudinary",
		"config": {
			"cloud_name": "your_cloud_name",
			"api_key": "your_api_key",
			"api_secret": "your_api_secret"
		},
		"upload": {
			"tags": "staging, flickr",
			"folder": "important"
		}
  }
}
```
This configuration will automatically add _staging_ and _flickr_ tags, and setup root folder as _important_

Connect Image model to cloudany datasource

model.config.json
```
{
  ...
  "Image": {
    "dataSource": "cloudinary",
    "public": true
  }
}
```

The configuration above will add POST ${restApiRoot}/images/upload url.
