'use strict';

var request = require('request');

function BlyprI (opts) {

	this.user = opts.user || 'system';
	this.userSecret = opts.userSecret;
}

BlyprI.prototype.send = function (args, callback) {

	var uri = [
			'http://blypr.com:3000',
			this.user,
			args.channelId
		].join('/'),
		auth = {
			user: args.user || this.user,
			pass: args.channelSecret,
			sendImmediately: true
		},
		options = {
			uri: uri,
			auth: auth,
			json: true,
			body: args.body
		};

	request.post(options, function (err, response, body) {

		if (!err && response.statusCode === 200) {
			callback(null, body);
		} else {
			callback( err || new Error('Bad status code: ' + response.statusCode));
		}
	});
};

module.exports = function (opts) { return new BlyprI(opts || {}); }
