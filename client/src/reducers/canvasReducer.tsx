import { Reducer } from "redux";
import { canvasDataType } from "../../../types/data";
import { setCanvasAction } from "types/actionTypes";

const initialState = null;

const canvasReducer: Reducer<canvasDataType | null, setCanvasAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_CANVAS":
			return { ...action.payload };
		default:
			if (state) return { ...state };
			else return null;
	}
};

export default canvasReducer;
