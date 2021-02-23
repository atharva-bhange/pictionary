import { gameDataType, canvasDataType } from "../../../types/data";
export type nameType = string | null;
export type roomType = string | null;

interface storeType {
	name: nameType;
	room: roomType;
	game: gameDataType;
	canvas: canvasDataType;
}

export default storeType;
