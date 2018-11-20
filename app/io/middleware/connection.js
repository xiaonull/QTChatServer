let qtBackstage = require('../service/qtBackstage.js');
let client = require('../service/client.js');

module.exports = app => {

	return async (ctx, next) => {
		const { socket } = ctx;
		const query = socket.handshake.query;
		const { userId, userName, password, type } = query;

		// 每成功与客户端完成一个连接，修改该 socket.id 为userId，方便后续消息发送时识别接收方 socket
		socket.id = userId;
		
		if(type === 'client') {
			client.connect(ctx, socket, userId, userName, password);
		}else if(type === 'QTBackstage') {
			qtBackstage.connect(ctx, socket, userName, password);
		}
		
		await next();

    	// 用户断开连接
    	if(type === 'client') {
			client.disconnect(ctx, userId);
		}else if(type === 'QTBackstage') {
			qtBackstage.disconnect(ctx);
		}
    	
    };

};