import { canvasDataType } from "types/storeType";
import {
	setPenSizeActionCreatorType,
	setPenColorActionCreatorType,
	clearCanvassActionCreatorType,
} from "types/actionCreatorTypes";

interface ColorSwatchPropType {
	canvasData: canvasDataType;
	setPenSize: setPenSizeActionCreatorType;
	setPenColor: setPenColorActionCreatorType;
	clearCanvas: clearCanvassActionCreatorType;
}

export default ColorSwatchPropType;
