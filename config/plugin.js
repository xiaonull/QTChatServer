'use strict';

const path = require('path');

exports.io = {
	enable: true,
	package: 'egg-socket.io',
};

exports.mongodb = {
	enable: true,
	path: path.join(__dirname, '../lib/plugin/egg-mongodb')
};

exports.redis = {
	enable: true,
	package: 'egg-redis',
};