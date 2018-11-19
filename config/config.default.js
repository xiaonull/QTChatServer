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

	config.mongodb = {
    	// 单数据库信息配置
    	client: {
	    	// host
	    	host: 'localhost',
	    	// 端口号
	    	port: '27017',
	    	// 用户名
	    	user: '',
	    	// 密码
	    	password: '',
	    	// 数据库名
	    	dbName: 'qt_chat',
	    },
	    // 是否加载到 app 上，默认开启
	    app: true,
	    // 是否加载到 agent 上，默认关闭
	    agent: false,
	};

	config.redis = {
		client: {
			port: 6379,          
			host: '127.0.0.1',   
			password: 'qt_redis',
			db: 0
		},
	};

	return config;
};
