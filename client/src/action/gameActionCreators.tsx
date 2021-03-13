import {
	setPlayersActionCreatorType,
	setTimeActionCreatorType,
	addChatActionCreatorType,
	clearChatActionCreatorType,
} from "types/actionCreatorTypes";

export const setPlayer: setPlayersActionCreatorType = (players) => {
	return {
		type: "SET_PLAYERS",
		players,
	};
};

export const setTime: setTimeActionCreatorType = (minutes, seconds) => {
	return {
		type: "SET_TIME",
		minutes,
		seconds,
	};
};

export const addChat: addChatActionCreatorType = (
	sender,
	isGuessed,
	message
) => {
	return {
		type: "ADD_CHAT",
		payload: {
			isGuessed,
			message,
			sender,
		},
	};
};

export const clearChat: clearChatActionCreatorType = () => {
	return {
		type: "CLEAR_CHAT",
	};
};
