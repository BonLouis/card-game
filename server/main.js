/**
 * Set some colorr
 */
const chalk = require( 'chalk' );
const srvOp = chalk.bgGreen.bold;
const info = chalk.yellow.italic;

/**
 * Network stuff
 */
// const ip = require('ip');
const express = require( 'express' );
const fs = require( 'fs' );

const app = express();

const server = require( 'http' ).Server( app );
const io = require( 'socket.io' )( server );

const localShared = false;
const host = localShared ? ip.address() : '127.0.0.1';
const port = '3030';

server.listen( port, host, () => {
	console.log( srvOp( `\nServer listening at http://${host}:${port}\n` ) );
} );

/**
 * Game's logic
 */
const connectedUsersMap = new Map();
const gameRooms = new Map();
/**
 * Socket's logic
 */
io.on( 'connect', ( socket ) => {

	console.log( info( `${socket.id} connected` ) )

	const userId = socket.id;

	// socket.emit('test', 10);
	io.emit( 'test', 10 );
	socket.emit( 'testAction', 100 );

	connectedUsersMap.set( socket.id, {
		status: 'online',
		playing: false
	} );

	socket.on( 'loggedIn', () => {
		console.log( connectedUsersMap );
		return false;
	} );

	socket.on( 'set pseudo', ( pseudo ) => {
		console.log( pseudo );
		const user = connectedUsersMap.get( userId );
		socket.pseudo = pseudo;
		connectedUsersMap.get( socket.id ).pseudo = pseudo;
		console.log( `${socket.pseudo} is connected` );
		io.emit( 'welcome', pseudo );
	} );

	socket.on( 'chat msg', ( chatmsg ) => {
		const data = {
			pseudo: socket.pseudo,
			text: chatmsg
		};
		socket.broadcast.emit( 'chat msg', data );
	} );

	socket.on( 'create game', ( config ) => {
		const idOfTheGame = socket.id;
		const playerWhoCreate = [ connectedUsersMap.get( socket.id ) ];
		gameRooms.set( idOfTheGame, {
			players: playerWhoCreate,
			config,
			status: 'off'
		} );
		io.emit( 'append game', gameRooms.get( idOfTheGame ), idOfTheGame );
	} );

	socket.on( 'join game', ( gameId ) => {
		if ( gameRooms.has( gameId ) ) {
			// socket.emit('running', ); // TODO
		}
	} );

	socket.on( 'disconnect', () => {
		connectedUsersMap.delete( socket.id );
		console.log( `${socket.pseudo} is disconnected` );
	} );

} );