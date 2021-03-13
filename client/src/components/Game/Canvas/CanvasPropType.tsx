import { canvasDataType } from "../../../../../types/data";
import { nameType, gameDataType } from "types/storeType";
import { Client } from "socket";
import {
	setIsPaintingActionCreatorType,
	setPenSizeActionCreatorType,
	clearCanvassActionCreatorType,
	setIsFinishedActionCreatorType,
	setCoordinateActionCreatorType,
} from "types/actionCreatorTypes";

interface CanvasPropType {
	width: number;
	height: number;
	canvasData: canvasDataType;
	gameData: gameDataType;
	name: nameType;
	setIsPainting: setIsPaintingActionCreatorType;
	setPenSize: setPenSizeActionCreatorType;
	clearCanvas: clearCanvassActionCreatorType;
	setIsFinished: setIsFinishedActionCreatorType;
	setCoordinate: setCoordinateActionCreatorType;
}

export default CanvasPropType;
