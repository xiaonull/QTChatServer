'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {

	async mesForward() {
		const { ctx, logger, app } = this;
		const message = ctx.args[0];
		try {
			// 使用 redis 来获取用户的在线情况
			let to = await app.redis.get(message.to.toString());
			if(to) {
				// 根据 message.to 找到该用户的 socket
				await ctx.socket.to(message.to).emit('receiveChatMes', message);
			}else {
				// 该用户离线，需将消息保存到数据库
				await new Promise((resolve, reject) => {
					app.mongodb.collection('chat_mes').insertOne(message, (err, res) => {
						if(err) {
							reject(err);
						}

						resolve();
					});
				});
			}
		}catch(e) {
			ctx.socket.emit('responseSendChatMes', {
				status_code: 500,
				message: '发送失败',
				data: {
					chat: message
				}
			});
			logger.error(e);
		}
	}

}

module.exports = ChatController;