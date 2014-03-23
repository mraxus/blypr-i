'use strict';

function BlyprChannel (opts, request) {

	this.request = request;

	this.baseUrl = opts.baseUrl;
	this.id = opts.channelId;
	this.name = opts.channelName;
	this.secret = opts.channelSecret;
	this.user = opts.user;
}

BlyprChannel.prototype._getType = function (data) {

	if (typeof data === 'number') return 'numeric';

	return 'string';
};

BlyprChannel.prototype.send = function (title, data, callback) {

	console.log('sending');

	var uri = [
			this.baseUrl,
			this.user,
			this.id
		].join('/'),

		auth = {
			user: this.user,
			pass: this.secret,
			sendImmediately: true
		},

		body = {
			title: title,
			data: data,
			type: this._getType(data)
		},

		options = {
			uri: uri,
			auth: auth,
			json: true,
			body: body
		};

	this.request.post(options, function (err, response, body) {

		if (!err && response.statusCode === 200) {
			callback(null, body);
		} else {
			callback( err || new Error('Bad status code: ' + response.statusCode));
		}
	});
};

module.exports = BlyprChannel;
