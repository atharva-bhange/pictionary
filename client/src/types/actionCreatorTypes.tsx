import { ThunkAction } from "redux-thunk";
import {
	setNameAction,
	setRoomAction,
	setGameAction,
	setCanvasAction,
	setIsPaintingAction,
	setPenColorAction,
	setPenSizeAction,
	clearCanvasAction,
} from "./actionTypes";
import storeType from "types/storeType";
import { gameDataType, canvasDataType } from "../../../types/data";

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

export type setCanvasDataActionCreator = (
	data: canvasDataType
) => setCanvasAction;

export type setIsPaintingActionCreatorType = (
	value: boolean
) => setIsPaintingAction;

export type setPenColorActionCreatorType = (color: string) => setPenColorAction;

export type setPenSizeActionCreatorType = (size: number) => setPenSizeAction;

export type clearCanvassActionCreatorType = (
	value?: boolean
) => clearCanvasAction;
