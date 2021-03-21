import Game from "../components/Game";
import Hub from "../components/Hub";
import Player from "../components/Player";
import { Server, Socket } from "socket.io";
import { randomGameResultType } from "types/data";

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
		hub.sendPlayerCount(io);
		if (gameId) {
			console.log("player removing from game");
			hub.getGame(gameId).leave(player);
			hub.getGame(gameId).sendPlayers(io);
			hub.getGame(gameId).checkEmpty();
		}
	}
};

export const newPlayerController = (
	data: any,
	socket: Socket,
	hub: Hub,
	io: Server
) => {
	console.log("player added to hub");
	const player = new Player(socket.id, data.name, socket);
	hub.addPlayer(player);
	socket.on("find-random-game", () => {
		const availableGame = hub.findRandomRoom();
		const data: randomGameResultType = { game: availableGame };
		socket.emit("random-game-result", data);
	});
	socket.on("get-online-players", () => {
		hub.sendPlayerCount(io);
	});
};
