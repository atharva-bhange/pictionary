// import { canvasDataType, gameDataType } from "../../../../../types/data";
import { nameType, canvasDataType, gameDataType } from "types/storeType";
import { Client } from "socket";
import {
	setIsPaintingActionCreatorType,
	setPenSizeActionCreatorType,
	clearCanvassActionCreatorType,
} from "types/actionCreatorTypes";

interface CanvasPropType {
	width: number;
	height: number;
	canvasData: canvasDataType;
	gameData: gameDataType;
	name: nameType;
	client: Client | null;
	setIsPainting: setIsPaintingActionCreatorType;
	setPenSize: setPenSizeActionCreatorType;
	clearCanvas: clearCanvassActionCreatorType;
}

export default CanvasPropType;
