import { Reducer } from "redux";
import {
	setGameAction,
	setPlayersAction,
	setTimeAction,
} from "types/actionTypes";
import { gameDataType } from "types/storeType";

const initialState: gameDataType = {
	isStarted: false,
	isFinished: false,
	id: null,
	round: null,
	players: [],
	timer: {
		minutes: 0,
		seconds: 0,
	},
};

type reducerActions = setGameAction | setPlayersAction | setTimeAction;

const gameReducer: Reducer<gameDataType, reducerActions> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case "SET_GAME":
			return { ...state, ...action.payload };
		case "SET_PLAYERS":
			return { ...state, players: action.players };
		case "SET_TIME":
			return {
				...state,
				timer: { minutes: action.minutes, seconds: action.seconds },
			};
		default:
			return { ...state };
	}
};

export default gameReducer;
