import { canvasDataType } from "../../../../../types/data";
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
