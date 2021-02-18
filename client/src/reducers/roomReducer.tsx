import { Reducer } from "redux";
import { roomType } from "types/storeType";
import { getRandomRoomAction, createRoomAction } from "types/actionTypes";

const initialState: roomType = null;

const roomReducer: Reducer<roomType, getRandomRoomAction | createRoomAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "CREATE_ROOM":
		case "GET_RANDOM_ROOM":
			return action.payload;
		default:
			return state;
	}
};

export default roomReducer;
