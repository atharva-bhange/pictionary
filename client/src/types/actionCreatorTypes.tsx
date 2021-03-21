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
	setPlayersAction,
	setTimeAction,
	addChatAction,
	clearChatAction,
	updateScoreAction,
	toggleScoreBoardAction,
	toggleIsFinishedAction,
	leaveGameAction,
	setOnlinePlayersAction,
} from "./actionTypes";
import storeType from "types/storeType";
import {
	canvasDataType,
	gameDataType,
	scoresDataType,
} from "../../../types/data";

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

export type setPlayersActionCreatorType = (
	players: string[]
) => setPlayersAction;

export type setTimeActionCreatorType = (
	minutes: number,
	seconds: number
) => setTimeAction;

export type addChatActionCreatorType = (
	sender: string,
	isGuessed: boolean,
	message: string | null
) => addChatAction;

export type clearChatActionCreatorType = () => clearChatAction;

export type updateScoreActionCreatorType = (
	newScore: scoresDataType
) => updateScoreAction;

export type toggleScoreBoardActionCreatorType = (
	newVal: boolean
) => toggleScoreBoardAction;

export type toggleIsFinishedActionCreatorType = (
	newVal: boolean
) => toggleIsFinishedAction;

export type leaveGameActionCreator = () => leaveGameAction;

export type setOnlinePlayersActionCreatorType = (
	count: number
) => setOnlinePlayersAction;
