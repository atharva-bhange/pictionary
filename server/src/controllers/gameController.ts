import Game from "../components/Game";
import Hub from "../components/Hub";
import Player from "../components/Player";
import { Server, Socket } from "socket.io";

export const joinGame = (io: Server, socket: Socket, hub: Hub, data: any) => {
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
	game.join(player);
	console.log(hub.getGames());

	socket.join(gameId);

	hub.addPlayer(player, gameId);

	// start game if 4 players are present
	if (game.players.length >= 2) {
		game.startRound(io);
	}
};

export const disconnectGame = (hub: Hub, socket: Socket) => {
	const { gameId, player } = hub.getPlayer(socket.id);
	hub.deletePlayer(player);
	hub.getGame(gameId).leave(player);
	if (hub.getGame(gameId).playerCount() === 0) {
		hub.deleteGame(gameId);
	}
};
