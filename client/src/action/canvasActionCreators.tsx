import {
	setIsPaintingActionCreatorType,
	setPenColorActionCreatorType,
	setPenSizeActionCreatorType,
	clearCanvassActionCreatorType,
} from "types/actionCreatorTypes";

export const setIsPainting: setIsPaintingActionCreatorType = (val) => {
	return {
		type: "SET_IS_PAINTING",
		payload: val,
	};
};

export const setPenColor: setPenColorActionCreatorType = (color) => {
	return {
		type: "SET_PEN_COLOR",
		payload: color,
	};
};

export const setPenSize: setPenSizeActionCreatorType = (size) => {
	return {
		type: "SET_PEN_SIZE",
		payload: size,
	};
};

export const clearCanvas: clearCanvassActionCreatorType = (value = true) => {
	return {
		type: "CLEAR_CANVAS",
		payload: value,
	};
};
