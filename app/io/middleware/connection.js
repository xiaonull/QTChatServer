module.exports = app => {

	return async (ctx, next) => {
		const { socket, logger, app } = ctx;
		const query = socket.handshake.query;
		const { userId } = query;

		// 每成功与客户端完成一个连接，修改该 socket.id 为userId，方便后续消息发送时识别接收方 socket
		socket.id = userId;

		try {
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
		
		await next();

    	// 用户断开连接
    	// 修改 redis 里该用户的连接情况为离线
    	app.redis.set(userId.toString(), '');
    	
    };

};