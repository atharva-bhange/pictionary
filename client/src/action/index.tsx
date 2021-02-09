import { setNameActionCreatorType } from "types/actionCreatorTypes";

export const setName: setNameActionCreatorType = (name) => {
	return {
		type: "SET_NAME",
		payload: name,
	};
};
