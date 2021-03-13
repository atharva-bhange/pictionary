import { canvasDataType } from "../../../types/data";

export type nameType = string | null;
export type roomType = string | null;
// export type canvasDataType = {
// 	isPainting: boolean;
// 	penSize: number;
// 	penColor: string;
// 	clear: boolean;
// 	isFinished: boolean;
// };
export type timerType = {
	minutes: number;
	seconds: number;
};

export type playerType = string[];

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
};

interface storeType {
	name: nameType;
	room: roomType;
	game: gameDataType;
	canvas: canvasDataType;
}

export default storeType;
