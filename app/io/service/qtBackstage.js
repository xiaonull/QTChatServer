'use strict';

module.exports = {
	
	async connect(ctx, socket, userName, password) {
		const { logger, app } = ctx;
		
		if(userName === 'QTBackstage' && password === '123456') {
			// 验证成功
			logger.info('QTBackstage 登录成功！');
		}else {
			socket.disconnect(true);
			logger.warn('QTBackstage 登录验证失败！');
		}
	},

	disconnect(ctx) {
		const { logger } = ctx;
		logger.info('QTBackstage disconnect!');
	}

}
