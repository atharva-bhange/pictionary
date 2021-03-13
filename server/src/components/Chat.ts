// Stores and contains functionaliy of chat

import { Server } from "socket.io";

import Player from "src/components/Player";
import {
	clientMessageDataType,
	serverMessageResponseDataType,
} from "types/data";
class Chat {
	private _word: string | null = null;
	private _players: Player[] = [];
	private _gameId: string;

	constructor(gameId: string) {
		this._gameId = gameId;
	}

	changeWord = (newWord: string) => {
		this._word = newWord;
	};

	enablePlayerChat = (player: Player, io: Server) => {
		player.socket.on("new-client-message", (data: clientMessageDataType) => {
			io.to(this._gameId).emit("new-chat-message", this._checkMessage(data));
		});
	};

	private _checkMessage = (
		data: clientMessageDataType
	): serverMessageResponseDataType => {
		if (!this._word)
			return {
				isGuessed: false,
				sender: data.name,
				message: data.message,
			};
		else if (data.message === this._word)
			return { isGuessed: true, sender: data.name, message: null };
		else
			return {
				isGuessed: false,
				sender: data.name,
				message: data.message,
			};
	};
}

export default Chat;
