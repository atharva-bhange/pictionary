import { io, Socket } from "socket.io-client";
import { setCanvasData } from "action/canvasActionCreators";
import store from "utils/storeConfig";
import {
	gameDataType,
	canvasDataType,
	serverMessageResponseDataType,
	clientMessageDataType,
} from "../../../types/data";
import { setPlayer, setTime, addChat } from "action/gameActionCreators";
import { nameType, playerType, timerType } from "types/storeType";
import watch from "redux-watch";
import equal from "deep-equal";

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

		let canvasWatcher = watch(store.getState, "canvas", equal);
		store.subscribe(canvasWatcher((newVal) => this._sendDrawingData(newVal)));
	}
	joinGame(name: string, gameId: string) {
		this.socket?.emit("join-game", { gameId, name });
	}
	private _sendDrawingData = (newVal: any) => {
		if (store.getState().game.round === null) return;
		if (store.getState().game.round?.isDrawer) {
			this.socket?.emit("drawing-data", newVal);
		}
	};

	sendMessage = (senderName: string, message: string) => {
		const data: clientMessageDataType = { name: senderName, message };
		this.socket?.emit("new-client-message", data);
	};

	disconnect() {
		this.socket?.disconnect();
	}
}
