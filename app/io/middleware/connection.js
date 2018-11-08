module.exports = app => {

	return async (ctx, next) => {
		const { socket } = ctx;
		const query = socket.handshake.query;
		const { userId } = query;
		// 每成功与客户端完成一个连接，修改该 socket.id 为userId，方便后续消息发送时识别接收方 socket
		socket.id = userId;

		console.log('connect: ' + userId);

		await next();

    	// execute when disconnect.
    	
    };

};