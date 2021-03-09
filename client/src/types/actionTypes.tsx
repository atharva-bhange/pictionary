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

export interface setIsPaintingAction {
	type: "SET_IS_PAINTING";
	payload: boolean;
}

export interface setPenSizeAction {
	type: "SET_PEN_SIZE";
	payload: number;
}

export interface setPenColorAction {
	type: "SET_PEN_COLOR";
	payload: string;
}

export interface clearCanvasAction {
	type: "CLEAR_CANVAS";
	payload: boolean;
}
