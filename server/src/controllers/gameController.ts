import Game from "../components/Game";
import Hub from "../components/Hub";
import Player from "../components/Player";
import { Server, Socket } from "socket.io";

export const joinGame = (io: Server, socket: Socket, hub: Hub, data: any) => {
	console.log("joining game");
	const { name, gameId } = data;

	// create player
	const player = new Player(socket.id, name, socket);
	let game: Game;

	// joining game
	if (hub.isGame(gameId)) {
		game = hub.getGame(gameId);
	} else {
		game = new Game(gameId);
		hub.addGame(game);
	}
	socket.join(gameId);
	game.join(player, io);
	console.log(hub.getGames());

	hub.addPlayer(player, gameId);
};

export const disconnectGame = (hub: Hub, socket: Socket, io: Server) => {
	console.log("player disconnected");
	if (hub.isPlayer(socket.id)) {
		const { gameId, player } = hub.getPlayer(socket.id);
		hub.deletePlayer(player);
		hub.getGame(gameId).leave(player);
		hub.getGame(gameId).sendPlayers(io);
		if (hub.getGame(gameId).playerCount() === 0) {
			hub.deleteGame(gameId);
		}
	}
};
