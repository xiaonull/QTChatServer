'use strict';

module.exports = app => {

	const { router, controller, io } = app;

	io.of('/').route('sendChatMes', io.controller.chat.mesForward);

};
