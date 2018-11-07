'use strict';

module.exports = app => {

	const { router, controller, io } = app;

	io.of('/').route('sendMes', io.controller.chat.mesForward);

};
