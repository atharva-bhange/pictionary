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

export type gameDataType = {
	id: string;
	players: string[];
	round: {
		isDrawer: boolean;
		word: string | null;
		drawer: string;
		id: number;
	};
} | null;

interface storeType {
	name: nameType;
	room: roomType;
	game: gameDataType;
	canvas: canvasDataType;
}

export default storeType;
