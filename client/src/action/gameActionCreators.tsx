import {
	setPlayersActionCreatorType,
	setTimeActionCreatorType,
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
