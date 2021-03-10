import { io, Socket } from "socket.io-client";
import { setCanvasData } from "action/canvasActionCreators";
import store from "utils/storeConfig";
import { gameDataType, canvasDataType } from "../../../types/data";

export class Client {
	socket: Socket;

	constructor() {
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
				newGame.round.word = null;
				this.socket.on("incoming-drawing-data", (data: canvasDataType) =>
					store.dispatch(setCanvasData(data))
				);
			}
			store.dispatch({ type: "SET_GAME", payload: newGame });
		});
	}
	joinGame(name: string, gameId: string) {
		this.socket.emit("join-game", { gameId, name });
	}
	sendDrawingData(drawingData: canvasDataType) {
		this.socket.emit("drawing-data", drawingData);
	}
}
