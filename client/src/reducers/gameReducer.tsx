import { Reducer } from "redux";
import { setGameAction } from "types/actionTypes";
import { gameDataType } from "../../../types/data";

const initialState = null;

const gameReducer: Reducer<gameDataType | null, setGameAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_GAME":
			return { ...action.payload };
		default:
			if (!state) return state;
			return { ...state };
	}
};

export default gameReducer;
