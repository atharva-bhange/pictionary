import { gameDataType } from "types/storeType";
import { canvasDataType, scoresDataType } from "../../../types/data";
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

export interface setIsFinishedAction {
	type: "SET_IS_FINISHED";
	payload: boolean;
}

export interface setCoordinateAction {
	type: "SET_COORDINATE";
	x: number;
	y: number;
}

export interface setPlayersAction {
	type: "SET_PLAYERS";
	players: string[];
}

export interface setTimeAction {
	type: "SET_TIME";
	minutes: number;
	seconds: number;
}

export interface addChatAction {
	type: "ADD_CHAT";
	payload: {
		isGuessed: boolean;
		sender: string;
		message: string | null;
	};
}

export interface clearChatAction {
	type: "CLEAR_CHAT";
}

export interface updateScoreAction {
	type: "UPDATE_SCORE";
	payload: scoresDataType;
}

export interface toggleScoreBoardAction {
	type: "TOGGLE_SCORE_BOARD";
	payload: boolean;
}

export interface toggleIsFinishedAction {
	type: "TOGGLE_IS_FINISHED";
	payload: boolean;
}

export interface leaveGameAction {
	type: "LEAVE_GAME";
}

export interface setOnlinePlayersAction {
	type: "SET_ONLINE_PLAYERS";
	payload: number;
}
