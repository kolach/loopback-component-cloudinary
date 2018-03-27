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

### Adding custom tags to single image

If you want to add a custom tags to each image separately, you can add them to request object, for 
example in `beforeRemote` hook. Here is an example how to add custom tags and folder to a file. 
Default tags will be overridden.  

```
Image.beforeRemote('upload', function (ctx, modelInstance, next) {
    ctx.req.uploadOpts = ctx.req.uploadOpts || {};
    ctx.req.uploadOpts.tags = 'cat, dog';
    ctx.req.uploadOpts.folder = 'private';
    next();
  });

```   
