import Game from "../components/Game";
import Hub from "../components/Hub";
import Player from "../components/Player";
import { Server, Socket } from "socket.io";

export const joinGame = (
	io: Server,
	socket: Socket,
	hub: Hub,
	gameId: string
) => {
	if (!hub.isPlayer(socket.id)) return;
	console.log("joining game");
	let game;

	// joining game
	if (hub.isGame(gameId)) {
		console.log("joining existing game");
		game = hub.getGame(gameId);
	} else {
		console.log("creating new game");
		game = new Game(gameId, onGameComplete(hub), hub.deleteGame);
		hub.addGame(game);
	}

	const player = hub.getPlayer(socket.id).player;
	game.join(player, io);
	console.log(hub.getGames());

	hub.joinGame(player, gameId);
};

const onGameComplete = (hub: Hub) => {
	return hub.leaveGame;
};

export const disconnectGame = (hub: Hub, socket: Socket, io: Server) => {
	console.log("player disconnected");
	if (hub.isPlayer(socket.id)) {
		const { gameId, player } = hub.getPlayer(socket.id);
		hub.deletePlayer(player);
		if (gameId) {
			console.log("player removing from game");
			hub.getGame(gameId).leave(player);
			hub.getGame(gameId).sendPlayers(io);
			hub.getGame(gameId).checkEmpty();
		}
	}
};
