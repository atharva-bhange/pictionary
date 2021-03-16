import { Reducer } from "redux";
import {
	setGameAction,
	setPlayersAction,
	setTimeAction,
	addChatAction,
	clearChatAction,
	updateScoreAction,
	toggleScoreBoardAction,
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
	chats: [],
	scores: {
		isDisplayed: false,
		data: {},
	},
};

type reducerActions =
	| setGameAction
	| setPlayersAction
	| setTimeAction
	| addChatAction
	| clearChatAction
	| updateScoreAction
	| toggleScoreBoardAction;

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
		case "ADD_CHAT":
			return {
				...state,
				chats: [...state.chats, action.payload],
			};
		case "CLEAR_CHAT":
			return {
				...state,
				chats: [],
			};
		case "UPDATE_SCORE":
			return { ...state, scores: { ...state.scores, data: action.payload } };
		case "TOGGLE_SCORE_BOARD":
			return {
				...state,
				scores: { ...state.scores, isDisplayed: action.payload },
			};
		default:
			return { ...state };
	}
};

export default gameReducer;
