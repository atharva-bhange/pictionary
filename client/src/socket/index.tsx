import { io, Socket } from "socket.io-client";
import { setGame } from "action";
import store from "utils/storeConfig";
import { gameDataType } from "../../../types/data";

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
			store.dispatch(setGame(game));
			if (game.round.drawer === store.getState().name) {
				// this player is the drawer
			} else {
			}
		});
	}
	joinGame(name: string, gameId: string) {
		this.socket.emit("join-game", { gameId, name });
	}
}
