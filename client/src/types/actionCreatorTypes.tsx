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
	setIsFinishedAction,
	setCoordinateAction,
} from "./actionTypes";
import storeType from "types/storeType";
import { canvasDataType, gameDataType } from "../../../types/data";

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

export type setGameActionCreatorType = (
	game: gameDataType
) => ThunkAction<void, storeType, {}, setGameAction>;

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

export type setIsFinishedActionCreatorType = (
	value: boolean
) => setIsFinishedAction;

export type setCoordinateActionCreatorType = (
	x: number,
	y: number
) => setCoordinateAction;
