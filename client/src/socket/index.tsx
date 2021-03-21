import { io, Socket } from "socket.io-client";
import { setCanvasData } from "action/canvasActionCreators";
import store from "utils/storeConfig";
import {
	gameDataType,
	canvasDataType,
	serverMessageResponseDataType,
	clientMessageDataType,
	scoresDataType,
	randomGameResultType,
} from "../../../types/data";
import {
	setPlayer,
	setTime,
	addChat,
	clearChat,
	updateScore,
	toggleScoreBoard,
	toggleIsFinished,
} from "action/gameActionCreators";
import { playerType, timerType } from "types/storeType";
import watch from "redux-watch";
import equal from "deep-equal";
import { setOnlinePlayers, setRoom } from "action";
import history from "utils/history";

export class Client {
	socket: Socket | null = null;
	connect() {
		console.log("conecting");
		this.socket = io("/", {
			transports: ["websocket"],
			path: "/socket",
		});
		this.socket.on("connect", () => {
			console.log("Connected to server");
		});
		this.socket.on("disconnect", () => {
			console.log("Disconnected from server");
		});
	}

	isConnected = () => {
		if (!this.socket) return false;
		if (this.socket.connected) return true;
		return false;
	};
	joinGame(name: string, gameId: string) {
		if (!this.socket) return;
		this.socket.emit("join-game", { gameId, name });
		this.socket.on("start-round", (game: gameDataType) => {
			const newGame = game as any;
			if (game.round.drawer === store.getState().name) {
				// this player is the drawer
				newGame.round.isDrawer = true;
			} else {
				newGame.round.isDrawer = false;
				this.socket?.on("incoming-drawing-data", (data: canvasDataType) => {
					//console.log("getting canvas data");
					store.dispatch(setCanvasData(data));
				});
			}
			newGame.isStarted = true;
			store.dispatch({ type: "SET_GAME", payload: newGame });
		});
		this.socket.on("players-update", (data: playerType) => {
			console.log("got players");
			store.dispatch(setPlayer(data));
		});

		this.socket.on("timer-data", (data: timerType) => {
			store.dispatch(setTime(data.minutes, data.seconds));
		});

		this.socket.on(
			"new-chat-message",
			(data: serverMessageResponseDataType) => {
				store.dispatch(addChat(data.sender, data.isGuessed, data.message));
			}
		);

		this.socket.on("clear-chat", () => {
			store.dispatch(clearChat());
		});

		this.socket.on("show-scores", () => {
			console.log("ordered to show");
			store.dispatch(toggleScoreBoard(true));
		});
		this.socket.on("hide-scores", () => {
			console.log("Ordered to hide");
			store.dispatch(toggleScoreBoard(false));
		});
		this.socket.on("score-update", (data: scoresDataType) => {
			store.dispatch(updateScore(data));
		});

		this.socket.on("show-score-finish", () => {
			store.dispatch(toggleScoreBoard(true));
			store.dispatch(toggleIsFinished(true));
		});

		let canvasWatcher = watch(store.getState, "canvas", equal);
		store.subscribe(canvasWatcher((newVal) => this._sendDrawingData(newVal)));
	}
	private _sendDrawingData = (newVal: any) => {
		if (store.getState().game.round === null) return;
		if (store.getState().game.round?.isDrawer && this.socket) {
			this.socket.emit("drawing-data", newVal);
		}
	};

	sendMessage = (senderName: string, message: string) => {
		if (!this.socket) return;
		const data: clientMessageDataType = { name: senderName, message };
		this.socket.emit("new-client-message", data);
	};

	newPlayer = (name: string) => {
		if (!this.socket) return;
		this.socket.emit("new-player", { name });
		this.getOnlinePlayers();
	};

	leaveGame = () => {
		if (!this.socket) return;
		this.socket.emit("leave-game");
	};

	disconnect() {
		console.log("running dissconnect");
		if (!this.socket) return;
		this.socket.disconnect();
	}

	findRandomGame = () => {
		if (!this.socket) return;
		this.socket.emit("find-random-game");
		this.socket.on("random-game-result", (data: randomGameResultType) => {
			if (data.game) {
				store.dispatch(setRoom(data.game));
				history.push(`/${data.game}`);
			} else {
				console.log("Couldn't find good room");
			}
		});
	};

	getOnlinePlayers = () => {
		if (!this.socket) return;
		this.socket.emit("get-online-players");
		this.socket.on("online-players", (data: number) => {
			store.dispatch(setOnlinePlayers(data));
		});
	};
}
