import { gameDataType, canvasDataType } from "../../../types/data";
export interface setNameAction {
	type: "SET_NAME";
	payload: string | null;
}

export interface setRoomAction {
	type: "SET_ROOM";
	payload: string | null;
}

export interface setGameAction {
	type: "SET_GAME";
	payload: gameDataType;
}

export interface setCanvasAction {
	type: "SET_CANVAS";
	payload: canvasDataType;
}
