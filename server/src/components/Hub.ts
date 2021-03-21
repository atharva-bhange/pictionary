// This class is responsible to storing all the running Games on the server!

import Game from "src/components/Game";
import Player from "./Player";

class Hub {
	private games: {
		[key: string]: Game;
	};
	private players: {
		[key: string]: {
			gameId: string | null;
			player: Player;
		};
	};
	constructor() {
		this.games = {};
		this.players = {};
	}
	addPlayer(player: Player) {
		this.players[player.id] = {
			gameId: null,
			player,
		};
	}
	deletePlayer(player: Player) {
		delete this.players[player.id];
	}
	addGame(game: Game) {
		this.games[game.id] = game;
	}
	deleteGame(gameId: string) {
		console.log(this.games);
		delete this.games[gameId];
		console.log(this.games);
	}
	getGames() {
		return this.games;
	}
	getGame(gameId: string) {
		return this.games[gameId];
	}
	isGame(gameId: string) {
		if (gameId in this.games) return true;
		else return false;
	}
	isPlayer(playerId: string) {
		if (playerId in this.players) return true;
		else return false;
	}
	getPlayer(playerId: string) {
		return this.players[playerId];
	}
	getPlayers() {
		return this.players;
	}
	joinGame(player: Player, gameId: string) {
		this.players[player.id] = {
			gameId,
			player,
		};
	}
	leaveGame(player: Player) {
		this.players[player.id] = {
			player,
			gameId: null,
		};
	}
}

export default Hub;
