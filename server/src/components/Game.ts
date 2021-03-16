// Stores all the Game data of a specific game
import Player from "./Player";
import { Server } from "socket.io";

import Round from "./Round";
import Chat from "./Chat";
import { canvasDataType, gameDataType } from "types/data";
import Score from "./Score";

class Game {
	id: string;
	players: Player[] = [];
	roundCount: number;
	rounds: Round[] = [];
	currentRoundId: number = 1;
	private _started = false;
	private _midRoundTime = 5000;
	private _chat: Chat;
	private _scores = new Score();

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
	};

	leave = (player: Player) => {
		this.players = this.players.filter((pl) => pl !== player);
	};

	playerCount() {
		return this.players.length;
	}

	sendPlayers(io: Server) {
		console.log("sending players");
		const players = this.players.map((player) => player.name);
		io.to(this.id).emit("players-update", players);
	}

	private _startRound = (io: Server) => {
		const currentRound = this.rounds[this.currentRoundId - 1]; // subtracting 1 to use as array index
		this._chat.changeWord(currentRound.word);
		const players = this.players.map((player) => player.name);
		// setting the drawer
		currentRound.drawer(
			this.players[Math.floor(Math.random() * this.players.length)]
		);
		console.log("starting round");
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
		io.to(this.id).emit("show-scores");
		setTimeout(() => {
			io.to(this.id).emit("hide-scores");
			if (this.currentRoundId === this.roundCount) {
				this.stop();
				return;
			} else this.currentRoundId += 1;
			this._chat.clearChat(io);
			this._startRound(io);
		}, this._midRoundTime);
	};

	stop = () => {};

	start = (io: Server) => {
		this._startRound(io);
		this._started = true;
	};

	isStarted = () => {
		return this._started;
	};
}

export default Game;
