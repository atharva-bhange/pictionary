import { ThunkAction } from "redux-thunk";
import { setNameAction, setRoomAction, setGameAction } from "./actionTypes";
import storeType from "types/storeType";
import { gameDataType } from "../../../types/data";

export type setNameActionCreatorType = (name: string | null) => setNameAction;

export type getRandomRoomActionCreatorType = ThunkAction<
	void,
	storeType,
	{},
	setRoomAction
>;

export type createRoomActionCreatorType = ThunkAction<
	void,
	storeType,
	{},
	setRoomAction
>;

export type setRoomActionCreatorType = (roomId: string | null) => setRoomAction;

export type setGameActionCreatorType = (game: gameDataType) => setGameAction;
