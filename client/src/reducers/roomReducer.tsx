import { Reducer } from "redux";
import { roomType } from "types/storeType";
import { leaveGameAction, setRoomAction } from "types/actionTypes";

const initialState: roomType = null;

const roomReducer: Reducer<roomType, setRoomAction | leaveGameAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_ROOM":
			return action.payload;
		case "LEAVE_GAME":
			return initialState;
		default:
			return state;
	}
};

export default roomReducer;
