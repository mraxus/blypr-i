'use strict';

var request = require('request'),
	BlyprI = require('./lib/');

module.exports = function (opts) { return new BlyprI(opts, request); };
