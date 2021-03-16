import { canvasDataType, scoresDataType } from "../../../types/data";

export type nameType = string | null;
export type roomType = string | null;
export type timerType = {
	minutes: number;
	seconds: number;
};

export type playerType = string[];

export interface chat {
	sender: string;
	isGuessed: boolean;
	message: string | null;
}

export type gameDataType = {
	id: string | null;
	isStarted: boolean;
	isFinished: boolean;
	players: playerType;
	round: {
		isDrawer: boolean;
		word: string;
		drawer: string;
		id: number;
	} | null;
	timer: timerType;
	chats: chat[];
	scores: {
		isDisplayed: boolean;
		data: scoresDataType;
	};
};

interface storeType {
	name: nameType;
	room: roomType;
	game: gameDataType;
	canvas: canvasDataType;
}

export default storeType;
