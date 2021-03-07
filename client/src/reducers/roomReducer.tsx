import { Reducer } from "redux";
import { roomType } from "types/storeType";
import { setRoomAction } from "types/actionTypes";

const initialState: roomType = "aa";

const roomReducer: Reducer<roomType, setRoomAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_ROOM":
			return action.payload;
		default:
			return state;
	}
};

export default roomReducer;
