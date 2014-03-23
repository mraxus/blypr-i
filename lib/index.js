'use strict';

function BlyprInternal (opts, request) {

	this.request = request;

	this.baseUrl =  opts.baseUrl || 'http://blypr.com:3000';
	this.user = opts.user || 'system';
	this.userSecret = opts.userSecret;
}

BlyprInternal.prototype.send = function (args, callback) {

	var uri = [
			args.baseUrl || this.baseUrl,
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

	this.request.post(options, function (err, response, body) {

		if (!err && response.statusCode === 200) {
			callback(null, body);
		} else {
			callback( err || new Error('Bad status code: ' + response.statusCode));
		}
	});
};

BlyprInternal.prototype.openChannel = function (args) {

	var Channel = require('./channel');

	return new Channel({
		baseUrl: this.baseUrl,
		user: this.user,

		channelId: args.channelId,
		channelName: args.channelName,
		channelSecret: args.channelSecret

	}, this.request);
};

module.exports = BlyprInternal;
