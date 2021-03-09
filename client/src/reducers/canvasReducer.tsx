import { Reducer } from "redux";
// import { canvasDataType } from "../../../types/data";
import { canvasDataType } from "types/storeType";
import {
	setCanvasAction,
	setIsPaintingAction,
	setPenColorAction,
	setPenSizeAction,
	clearCanvasAction,
} from "types/actionTypes";

const initialState: canvasDataType = {
	isPainting: false,
	penColor: "#000000",
	penSize: 8,
	clear: false,
};

type reducerActions =
	| setCanvasAction
	| setIsPaintingAction
	| setPenColorAction
	| setPenSizeAction
	| clearCanvasAction;

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
		default:
			return { ...state };
	}
};

export default canvasReducer;
