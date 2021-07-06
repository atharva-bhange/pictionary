import { Reducer } from "redux";
import { canvasDataType } from "shared/data";
import {
	setCanvasAction,
	setIsPaintingAction,
	setPenColorAction,
	setPenSizeAction,
	clearCanvasAction,
	setIsFinishedAction,
	setCoordinateAction,
	leaveGameAction,
} from "types/actionTypes";

const initialState: canvasDataType = {
	isPainting: false,
	penColor: "#000000",
	penSize: 8,
	clear: false,
	isFinished: true,
	xCor: 0,
	yCor: 0,
};

type reducerActions =
	| setCanvasAction
	| setIsPaintingAction
	| setPenColorAction
	| setPenSizeAction
	| clearCanvasAction
	| setIsFinishedAction
	| setCoordinateAction
	| leaveGameAction;

const canvasReducer: Reducer<canvasDataType, reducerActions> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_IS_PAINTING":
			return { ...state, isPainting: action.payload };
		case "SET_PEN_COLOR":
			return { ...state, penColor: action.payload };
		case "SET_PEN_SIZE":
			return { ...state, penSize: action.payload };
		case "CLEAR_CANVAS":
			return { ...state, clear: action.payload };
		case "SET_IS_FINISHED":
			return { ...state, isFinished: action.payload };
		case "SET_COORDINATE":
			return { ...state, xCor: action.x, yCor: action.y };
		case "SET_CANVAS":
			return { ...action.payload };
		case "LEAVE_GAME":
			return { ...initialState };
		default:
			return { ...state };
	}
};

export default canvasReducer;
