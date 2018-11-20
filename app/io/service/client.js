'use strict';

let baseURL = 'http://192.168.137.1';

module.exports = {
	
	async connect(ctx, socket, userId, userName, password) {
		const { logger, app } = ctx;

		try {
			// 验证用户
			let res = await app.curl(baseURL + '/login', {
				method: 'POST',
				contentType: 'json',
				data: {
					userName,
					password
				},
				dataType: 'json'
			});

			
			if(res.data.status_code !== 200) {
				// 验证失败，断开连接
				socket.disconnect(true);
				return;
			}

			// 修改 redis 里该用户的连接情况为在线
			await app.redis.set(userId.toString(), 'online');

			// 检测该用户有没有离线消息
			let messages = await new Promise((resolve, reject) => {
				app.mongodb.collection('chat_mes').find({to: parseInt(userId)}).sort({createdAt: -1}).toArray((err, res) => {
					if(err) {
						reject(err);
					}

					resolve(res);
				});
			});
			
			if(messages.length > 0) {
				// 将离线消息发送给用户
				socket.emit('receiveOfflineChatMes', messages);

				// 将消息从数据库里删除
				app.mongodb.collection('chat_mes').deleteMany({to: parseInt(userId)}, (err, res) => {
					if(err) {
						throw err;
					}
				});
			}
		}catch(e) {
			logger.error(e);
		}
	},

	disconnect(ctx, userId) {
		const { app } = ctx;

		// 修改 redis 里该用户的连接情况为离线
		app.redis.set(userId.toString(), '');
	}

}
