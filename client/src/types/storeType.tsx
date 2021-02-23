import { gameDataType } from "../../../types/data";
export type nameType = string | null;
export type roomType = string | null;

interface storeType {
	name: nameType;
	room: roomType;
	game: gameDataType;
}

export default storeType;
