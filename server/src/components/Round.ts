import { Server } from "socket.io";
import Player from "./Player";

class Round {
	id: number;
	word: string;
	drawerPlayer: Player | null;
	private _seconds: number;
	private _startTime = 0.1 * 60;
	private _words = [
		"Angel",
		"Eyeball",
		"Pizza",
		"Angry",
		"Fireworks",
		"Pumpkin",
		"Baby",
		"Flower",
		"Rainbow",
		"Beard",
		"Recycle",
		"Bible",
		"Giraffe",
		"Glasses",
		"Snowflake",
		"Book",
		"Stairs",
		"Bucket",
		"Starfish",
		"Bumble bee",
		"Igloo",
		"Strawberry",
		"Butterfly",
		"Sun",
		"Camera",
		"Lamp",
		"Tire",
		"Cat",
		"Lion",
		"Toast",
		"Church",
		"Mailbox",
		"Toothbrush",
		"Crayon",
		"Night",
		"Toothpaste",
		"Dolphin",
		"Nose",
		"Truck",
		"Egg",
		"Olympics",
		"Volleyball",
		"Peanut",
	];
	readonly leastScore = 30;
	availableScoreIndex = 0;
	readonly scores = [200, 100, 50, this.leastScore];
	guessedPlayers: Record<string, boolean> = {};

	constructor(id: number) {
		this.id = id;
		this.drawerPlayer = null;
		this.word = this._words[Math.floor(Math.random() * this._words.length)];
		this._seconds = this._startTime;
	}

	drawer(player: Player) {
		this.drawerPlayer = player;
	}

	startTimmer = (io: Server, gameId: string, onStopCallback: Function) => {
		const intervalId: any = setInterval(
			() => this._updateTime(io, gameId, onStopCallback, intervalId),
			1000
		);
	};

	private _updateTime = (
		io: Server,
		gameId: string,
		onStopCallback: Function,
		intervalId: NodeJS.Timeout
	) => {
		const minutes = Math.floor(this._seconds / 60);
		const seconds = this._seconds % 60;

		this._sendTimmerData(minutes, seconds, io, gameId);

		this._seconds--;
		if (this._seconds < 0) {
			this._stopTimmer(intervalId);
			onStopCallback();
		}
	};

	private _stopTimmer = (intervalId: NodeJS.Timeout) => {
		clearInterval(intervalId);
	};

	private _sendTimmerData = (
		minutes: number,
		seconds: number,
		io: Server,
		gameId: string
	) => {
		io.to(gameId).emit("timer-data", { minutes, seconds });
	};

	incrementScoreIndex = () => {
		if (this.availableScoreIndex < this.scores.length - 1)
			this.availableScoreIndex += 1;
	};
}

export default Round;
