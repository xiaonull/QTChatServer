'use strict';

module.exports = appInfo => {
	const config = exports = {};

	config.keys = appInfo.name + '_1541496775379_3840';

	config.middleware = [];

	config.io = {
		init: {},
		namespace: {
			'/': {
				connectionMiddleware: ['connection'],
				packetMiddleware: ['packet'],
			}
		}
	};

	return config;
};
