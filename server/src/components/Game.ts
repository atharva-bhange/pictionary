// Stores all the Game data of a specific game
import Player from "./Player";
import { Server } from "socket.io";

import Round from "./Round";
import { gameDataType, canvasDataType } from "../../../types/data";

class Game {
	id: string;
	players: Player[] = [];
	roundCount: number;
	rounds: Round[] = [];
	currentRoundId: number = 1;

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

	startRound = (io: Server) => {
		const currentRound = this.rounds[this.currentRoundId];
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
			},
		};

		io.to(this.id).emit("start-round", gameData);

		currentRound.drawerPlayer?.socket.on(
			"drawing-data",
			(data: canvasDataType) => {
				currentRound.drawerPlayer?.socket
					.to(this.id)
					.emit("incoming-drawing-data", data);
			}
		);
	};
}

export default Game;
