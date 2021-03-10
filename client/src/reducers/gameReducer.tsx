import { Reducer } from "redux";
import { setGameAction } from "types/actionTypes";
import { gameDataType } from "types/storeType";

const initialState: gameDataType = null;

const gameReducer: Reducer<gameDataType, setGameAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_GAME":
			if (!action.payload) return action.payload;
			return { ...action.payload };
		default:
			if (!state) return state;
			return { ...state };
	}
};

export default gameReducer;
