// Stores all the Game data of a specific game
import Player from "./Player";
import { Server } from "socket.io";

import Round from "./Round";
import Chat from "./Chat";
import { canvasDataType, gameDataType } from "shared/data";
import Score from "./Score";
import Hub from "./Hub";
import hub from "../models/hubModel";

class Game {
	id: string;
	players: Player[] = [];
	roundCount: number;
	rounds: Round[] = [];
	currentRoundId: number = 1;
	private _started = false;
	private _midRoundTime = 3000;
	private _chat: Chat;
	private _scores = new Score();
	drawerComplete: Record<string, boolean> = {};

	constructor(id: string) {
		this.id = id;
		this.roundCount = 3;
		for (let i = 1; i <= 3; i++) {
			this.rounds.push(new Round(i));
		}
		this._chat = new Chat(this.id, (name) => {
			this._scores.updateScore(name, this.rounds[this.currentRoundId - 1]);
		});
	}

	join = (newPlayer: Player, io: Server) => {
		newPlayer.socket.join(this.id);
		this.players.push(newPlayer);
		this._scores.addPlayer(newPlayer.name);

		this.sendPlayers(io);

		// start game if 4 players are present
		if (this.players.length >= 3 && !this.isStarted()) {
			this.start(io);
		}

		if (this.isStarted()) {
			const currentRound = this.rounds[this.currentRoundId - 1]; // subtracting 1 to use as array index
			const players = this.players.map((player) => player.name);
			const gameData: gameDataType = {
				id: this.id,
				players: players,
				round: {
					word: currentRound.word,
					drawer: currentRound.drawerPlayer?.name as string,
					id: currentRound.id,
				},
			};
			newPlayer.socket.emit("start-round", gameData);
		}

		this._chat.enablePlayerChat(newPlayer, io);

		newPlayer.socket.on("leave-game", () => {
			this.leave(newPlayer);
			hub.leaveGame(newPlayer);
			this.checkEmpty();
			this.sendPlayers(io);
		});
	};

	leave = (player: Player) => {
		player.socket.leave(this.id);
		this.players = this.players.filter((pl) => pl !== player);
	};

	playerCount() {
		return this.players.length;
	}

	sendPlayers(io: Server) {
		// console.log("sending players");
		const players = this.players.map((player) => player.name);
		io.to(this.id).emit("players-update", players);
	}

	private _startRound = (io: Server) => {
		const currentRound = this.rounds[this.currentRoundId - 1]; // subtracting 1 to use as array index
		this._chat.changeWord(currentRound.word);
		const players = this.players.map((player) => player.name);
		// setting the drawer
		currentRound.setDrawer(this.players, this.drawerComplete);
		// console.log("starting round");
		const gameData: gameDataType = {
			id: this.id,
			players: players,
			round: {
				word: currentRound.word,
				drawer: currentRound.drawerPlayer?.name as string,
				id: currentRound.id,
			},
		};

		io.to(this.id).emit("start-round", gameData);
		this._scores.send(this.id, io);
		currentRound.startTimmer(io, this.id, () => this.stopRound(io));

		currentRound.drawerPlayer?.socket.on("drawing-data", (data) => {
			currentRound.drawerPlayer?.socket
				.to(this.id)
				.emit("incoming-drawing-data", data);
		});
	};

	stopRound = (io: Server) => {
		this._scores.send(this.id, io);
		if (this.currentRoundId === this.roundCount) {
			io.emit("show-score-finish");
			this.stop();
			return;
		}
		io.to(this.id).emit("show-scores");
		setTimeout(() => {
			io.to(this.id).emit("hide-scores");
			this.currentRoundId += 1;
			this._chat.clearChat(io);
			this._startRound(io);
		}, this._midRoundTime);
	};

	stop = () => {
		this.players.forEach((player) => {
			// console.log("player forced to leave");
			hub.leaveGame(player);
		});
		// console.log(this.id);
		hub.deleteGame(this.id);
	};

	start = (io: Server) => {
		this._startRound(io);
		this._started = true;
	};

	isStarted = () => {
		return this._started;
	};

	checkEmpty = () => {
		if (this.playerCount() === 0) {
			// console.log("deleting game due to no players");
			this.clearTimer();
			hub.deleteGame(this.id);
		}
	};

	clearTimer = () => {
		for (let i = 0; i < this.rounds.length; i++) {
			this.rounds[i].stopTimmer();
		}
	};
}

export default Game;
