import { Reducer } from "redux";

import { nameType } from "types/storeType";
import { setNameAction } from "types/actionTypes";

const initialState: nameType = null;

const nameReducer: Reducer<nameType, setNameAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_NAME":
			return action.payload;
		default:
			return state;
	}
};

export default nameReducer;
