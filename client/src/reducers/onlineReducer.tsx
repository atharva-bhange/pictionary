import { Reducer } from "redux";
import { setOnlinePlayersAction } from "types/actionTypes";
import { onlineType } from "types/storeType";

const initialState: onlineType = 0;

const onlineReducer: Reducer<onlineType, setOnlinePlayersAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_ONLINE_PLAYERS":
			return action.payload;
		default:
			return state;
	}
};

export default onlineReducer;
