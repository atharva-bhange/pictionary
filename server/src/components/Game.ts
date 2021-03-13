// Stores all the Game data of a specific game
import Player from "./Player";
import { Server } from "socket.io";

import Round from "./Round";
import { canvasDataType, gameDataType } from "types/data";

class Game {
	id: string;
	players: Player[] = [];
	roundCount: number;
	rounds: Round[] = [];
	currentRoundId: number = 1;
	private _midRoundTime = 5000;

	constructor(id: string) {
		this.id = id;
		this.roundCount = 3;
		for (let i = 1; i <= 3; i++) {
			this.rounds.push(new Round(i));
		}
	}

	join = (newPlayer: Player) => {
		this.players.push(newPlayer);
	};
	leave = (player: Player) => {
		this.players = this.players.filter((pl) => pl !== player);
	};

	playerCount() {
		return this.players.length;
	}

	sendPlayers(io: Server) {
		const players = this.players.map((player) => player.name);
		io.to(this.id).emit("players-update", players);
	}

	startRound = (io: Server) => {
		const currentRound = this.rounds[this.currentRoundId - 1]; // subtracting 1 to use as array index
		const players = this.players.map((player) => player.name);
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

		currentRound.startTimmer(io, this.id, () => this.stopRound(io));

		currentRound.drawerPlayer?.socket.on("drawing-data", (data) => {
			currentRound.drawerPlayer?.socket
				.to(this.id)
				.emit("incoming-drawing-data", data);
		});
	};

	stopRound = (io: Server) => {
		setTimeout(() => {
			if (this.currentRoundId === this.roundCount) {
				this.stopGame();
				return;
			} else this.currentRoundId += 1;
			this.startRound(io);
		}, this._midRoundTime);
	};

	stopGame = () => {};
}

export default Game;
