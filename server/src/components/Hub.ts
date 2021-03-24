// This class is responsible to storing all the running Games on the server!

import { Server } from "socket.io";
import Game from "src/components/Game";
import { getRandom } from "../utils/utilFunctions";
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

	findRandomRoom() {
		let availableGames: string[] = [];
		for (let gamId of Object.keys(this.games)) {
			const game = this.games[gamId];
			if (game.currentRoundId < 3) {
				availableGames.push(gamId);
			}
		}
		return getRandom<string>(availableGames);
	}

	playerCount() {
		return Object.keys(this.players).length;
	}

	sendPlayerCount(io: Server) {
		io.emit("online-players", this.playerCount());
	}
}

export default Hub;
