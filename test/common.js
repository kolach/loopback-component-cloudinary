'use strict';

global.chai = require('chai');
global.should = require('chai').should();
global.expect = require('chai').expect;
global.spy = require('sinon').spy;
global.stub = require('sinon').stub;
global.AssertionError = require('chai').AssertionError;

global.swallow = function(thrower) {
	try {
		thrower();
	} catch(e) {
	}
};

var sinonChai = require('sinon-chai');

chai.use(sinonChai);
