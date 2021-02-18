export interface setNameAction {
	type: "SET_NAME";
	payload: string | null;
}

export interface getRandomRoomAction {
	type: "GET_RANDOM_ROOM";
	payload: string;
}

export interface createRoomAction {
	type: "CREATE_ROOM";
	payload: string;
}
