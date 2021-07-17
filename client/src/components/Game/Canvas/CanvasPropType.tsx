import { canvasDataType } from "shared/data";
import { gameDataType } from "types/storeType";
import {
	setIsPaintingActionCreatorType,
	setPenSizeActionCreatorType,
	clearCanvassActionCreatorType,
	setIsFinishedActionCreatorType,
	setCoordinateActionCreatorType,
	setCanvasDimensionActionCreatorType,
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
	setCanvasDimension: setCanvasDimensionActionCreatorType;
}

export default CanvasPropType;
