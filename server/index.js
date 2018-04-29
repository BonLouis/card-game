const { mapToStr } = require('../utils');

/**
 * Set some colorr
 */
const chalk = require('chalk');
const srvOp = chalk.bgGreen.bold;
const info = chalk.yellow.italic;

/**
 * Network stuff
 */
// const ip = require('ip');
const express = require('express');
const fs = require('fs');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const localShared = false;
const host = localShared ? ip.address() : '127.0.0.1';
const port = '3030';

server.listen(port, host, () => {
	console.log(srvOp(`\nServer listening at http://${host}:${port}\n`));
});

/**
 * Game's logic
 */
const connectedUsersMap = new Map();
const gameRooms = new Map();

app.get('/debug', (req, res) => {
	res.send({
		connected: mapToStr(connectedUsersMap),
		gamerooms: mapToStr(gameRooms)
	});
});
/**
 * Socket's logic
 */
io.on('connect', (socket) => {

	console.log(info(`${socket.id} connected`))

	const userId = socket.id;
	socket.emit('give_id', userId);
	socket.on('ask_id', cb => {
		socket.emit('give_id', userId);
		cb();
	});
	socket.on('post_user', datas => {
		connectedUsersMap.set(socket.id, {...datas});
		console.log(`${datas.pseudo} is online`);
		io.emit('add_user', mapToStr(connectedUsersMap));
	});

	socket.on('pseudo set', (pseudo) => {

	});

	// socket.on('chat msg', (chatmsg) => {
	// 	const data = {
	// 		pseudo: socket.pseudo,
	// 		text: chatmsg
	// 	};
	// 	socket.broadcast.emit('chat msg', data);
	// });

	// socket.on('create game', (config) => {
	// 	const idOfTheGame = socket.id;
	// 	const playerWhoCreate = [connectedUsersMap.get(socket.id)];
	// 	gameRooms.set(idOfTheGame, {
	// 		players: playerWhoCreate,
	// 		config,
	// 		status: 'off'
	// 	});
	// 	io.emit('append game', gameRooms.get(idOfTheGame), idOfTheGame);
	// });

	// socket.on('join game', (gameId) => {
	// 	if (gameRooms.has(gameId)) {
	// 		// socket.emit('running', ); // TODO
	// 	}
	// });

	socket.on('disconnect', () => {
		connectedUsersMap.delete(socket.id);
		console.log(`${socket.pseudo} is disconnected`);
	});

});