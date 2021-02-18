import { ThunkAction } from "redux-thunk";
import {
	setNameAction,
	getRandomRoomAction,
	createRoomAction,
} from "./actionTypes";
import storeType from "types/storeType";

export type setNameActionCreatorType = (name: string | null) => setNameAction;

export type getRandomRoomActionCreatorType = ThunkAction<
	void,
	storeType,
	{},
	getRandomRoomAction
>;

export type createRoomActionCreator = ThunkAction<
	void,
	storeType,
	{},
	createRoomAction
>;
