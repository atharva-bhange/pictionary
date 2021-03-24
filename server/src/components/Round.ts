import { Server } from "socket.io";
import Player from "./Player";

class Round {
	id: number;
	word: string;
	drawerPlayer: Player | null;
	private _seconds: number;
	private _startTime = 1.5 * 60;
	private _words = [
		"angel",
		"eyeball",
		"pizza",
		"angry",
		"fireworks",
		"pumpkin",
		"baby",
		"flower",
		"rainbow",
		"beard",
		"recycle",
		"bible",
		"giraffe",
		"glasses",
		"snowflake",
		"book",
		"stairs",
		"bucket",
		"starfish",
		"igloo",
		"strawberry",
		"butterfly",
		"sun",
		"camera",
		"lamp",
		"tire",
		"cat",
		"lion",
		"toast",
		"church",
		"mailbox",
		"toothbrush",
		"crayon",
		"night",
		"toothpaste",
		"dolphin",
		"nose",
		"truck",
		"egg",
		"olympics",
		"volleyball",
	];
	readonly leastScore = 30;
	availableScoreIndex = 0;
	readonly scores = [200, 100, 50, this.leastScore];
	guessedPlayers: Record<string, boolean> = {};
	currentIntervalId: NodeJS.Timeout | null = null;

	constructor(id: number) {
		this.id = id;
		this.drawerPlayer = null;
		this.word = this._words[Math.floor(Math.random() * this._words.length)];
		this._seconds = this._startTime;
	}

	setDrawer(allPlayers: Player[], drawerComplete: Record<string, boolean>) {
		let availableDrawers = [];
		for (let i = 0; i < allPlayers.length; i++) {
			const player = allPlayers[i];
			if (drawerComplete.hasOwnProperty(player.name)) {
				if (drawerComplete[player.name] === false)
					availableDrawers.push(player);
			} else {
				availableDrawers.push(player);
			}
		}
		if (availableDrawers.length === 0) {
			drawerComplete = {};
			availableDrawers = allPlayers;
		}
		this.drawerPlayer =
			availableDrawers[Math.floor(Math.random() * availableDrawers.length)];
		// keeping record of people who have drawn
		drawerComplete[this.drawerPlayer.name] = true;
	}

	startTimmer = (io: Server, gameId: string, onStopCallback: Function) => {
		this.currentIntervalId = setInterval(
			() => this._updateTime(io, gameId, onStopCallback),
			1000
		);
	};

	private _updateTime = (
		io: Server,
		gameId: string,
		onStopCallback: Function
	) => {
		const minutes = Math.floor(this._seconds / 60);
		const seconds = this._seconds % 60;

		this._sendTimmerData(minutes, seconds, io, gameId);

		this._seconds--;
		if (this._seconds < 0) {
			this.stopTimmer();
			onStopCallback();
		}
	};

	stopTimmer = () => {
		if (this.currentIntervalId) clearInterval(this.currentIntervalId);
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
