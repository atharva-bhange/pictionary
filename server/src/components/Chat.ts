// Stores and contains functionaliy of chat

import { Server } from "socket.io";

import Player from "src/components/Player";
import {
	clientMessageDataType,
	serverMessageResponseDataType,
} from "types/data";
class Chat {
	private _word: string | null = null;
	private _gameId: string;
	private _scoreUpdateCallback: Function;

	constructor(gameId: string, scoreUpdateCallback: (name: string) => void) {
		this._gameId = gameId;
		this._scoreUpdateCallback = scoreUpdateCallback;
	}

	changeWord = (newWord: string) => {
		this._word = newWord;
	};

	enablePlayerChat = (player: Player, io: Server) => {
		player.socket.on("new-client-message", (data: clientMessageDataType) => {
			io.to(this._gameId).emit("new-chat-message", this._checkMessage(data));
		});
	};

	clearChat = (io: Server) => {
		io.to(this._gameId).emit("clear-chat");
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
		else if (data.message === this._word) {
			this._scoreUpdateCallback(data.name);
			return { isGuessed: true, sender: data.name, message: null };
		} else
			return {
				isGuessed: false,
				sender: data.name,
				message: data.message,
			};
	};
}

export default Chat;
