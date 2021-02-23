// This class is responsible to storing all the running Games on the server!

import Game from "components/Game";
import Player from "./Player";

class Hub {
	private games: {
		[key: string]: Game;
	};
	private players: {
		[key: string]: {
			gameId: string;
			player: Player;
		};
	};
	constructor() {
		this.games = {};
		this.players = {};
	}
	addPlayer(player: Player, gameId: string) {
		this.players[player.id] = {
			gameId: gameId,
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
		delete this.games[gameId];
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
	getPlayer(playerId: string) {
		return this.players[playerId];
	}
	getPlayers() {
		return this.players;
	}
}

export default Hub;
