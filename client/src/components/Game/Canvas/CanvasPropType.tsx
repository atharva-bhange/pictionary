import { canvasDataType } from "../../../../../types/data";
import { gameDataType } from "types/storeType";
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
	setIsPainting: setIsPaintingActionCreatorType;
	setPenSize: setPenSizeActionCreatorType;
	clearCanvas: clearCanvassActionCreatorType;
	setIsFinished: setIsFinishedActionCreatorType;
	setCoordinate: setCoordinateActionCreatorType;
}

export default CanvasPropType;
