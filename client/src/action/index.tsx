import axios from "axios";
import {
	setNameActionCreatorType,
	getRandomRoomActionCreatorType,
	createRoomActionCreatorType,
	setRoomActionCreatorType,
} from "types/actionCreatorTypes";
import apiHandler from "utils/apiHandler";

export const setName: setNameActionCreatorType = (name) => {
	return {
		type: "SET_NAME",
		payload: name,
	};
};

export const setRoom: setRoomActionCreatorType = (roomId) => {
	return {
		type: "SET_ROOM",
		payload: roomId,
	};
};

export const getRandomRoom = (): getRandomRoomActionCreatorType => (
	dispatch
) => {
	new apiHandler(axios.get("/api/v1/room"))
		.code(200, (res) => {
			dispatch({
				type: "SET_ROOM",
				payload: res.data.room.roomId as string,
			});
		})
		.code(204, () => {
			console.log("no room found");
		})
		.code(500, () => {
			console.log("Server Error");
		})
		.call();
};

export const createRoom = (newRoom: string): createRoomActionCreatorType => (
	dispatch
) => {
	new apiHandler(
		axios.post("/api/v1/room", {
			roomId: newRoom,
		})
	)
		.code(200, (res) => {
			dispatch({
				type: "SET_ROOM",
				payload: res.data.room.roomId,
			});
		})
		.code(500, () => {
			console.log("Could Not create room");
		})
		.call();
};
