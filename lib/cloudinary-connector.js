var CloudinaryStorageService = require('./cloudinary-storage-service');

/**
 * Initialize the icloudinary storage service as a connector for LoopBack data sources
 * @param {DataSource} dataSource DataSource instance
 * @prop {Object} settings Connector settings
 * @callback {Function} callback Callback function
 * @param {String|Object} err Error string or object
 */

exports.initialize = function(dataSource, callback) {
	var settings = dataSource.settings || {};
	var connector = new CloudinaryStorageService(settings);

  dataSource.connector = connector;
  dataSource.connector.dataSource = dataSource;
	connector.DataAccessObject = function() {};

	for (var m in CloudinaryStorageService.prototype) {
    var method = CloudinaryStorageService.prototype[m];

    if ('function' === typeof method) {
      connector.DataAccessObject[m] = method.bind(connector);
      for (var k in method) {
        connector.DataAccessObject[m][k] = method[k];
      }
    }
  }

	connector.define = function(model, properties, settings) {};
};


