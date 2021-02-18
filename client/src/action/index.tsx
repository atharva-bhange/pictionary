import axios from "axios";
import {
	setNameActionCreatorType,
	getRandomRoomActionCreatorType,
	createRoomActionCreator,
} from "types/actionCreatorTypes";
import apiHandler from "utils/apiHandler";

export const setName: setNameActionCreatorType = (name) => {
	return {
		type: "SET_NAME",
		payload: name,
	};
};

export const getRandomRoom = (): getRandomRoomActionCreatorType => (
	dispatch
) => {
	new apiHandler(axios.get("/api/v1/room"))
		.code(200, (res) => {
			dispatch({
				type: "GET_RANDOM_ROOM",
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

export const createRoom = (newRoom: string): createRoomActionCreator => (
	dispatch
) => {
	new apiHandler(
		axios.post("/api/v1/room", {
			roomId: newRoom,
		})
	)
		.code(200, (res) => {
			dispatch({
				type: "CREATE_ROOM",
				payload: res.data.room.roomId,
			});
		})
		.code(500, () => {
			console.log("Could Not create room");
		})
		.call();
};
