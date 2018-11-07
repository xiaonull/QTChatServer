'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {

	async mesForward() {
		const { ctx, logger } = this;
		const message = ctx.args[0];
		try {
			// 根据 message.to 找到该用户的 socket
			await ctx.socket.to(message.to).emit('receiveMes', message.mes);
			ctx.socket.emit('receiveMes', {
				status_code: 200,
				message: '发送成功',
				data: {}
			});
		}catch(e) {
			ctx.socket.emit('receiveMes', {
				status_code: 500,
				message: '发送失败',
				data: {}
			});
			logger.error(e);
		}
		
	}

}

module.exports = ChatController;