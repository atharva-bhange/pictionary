import {
	setIsPaintingActionCreatorType,
	setPenColorActionCreatorType,
	setPenSizeActionCreatorType,
	clearCanvassActionCreatorType,
	setIsFinishedActionCreatorType,
	setCanvasDataActionCreator,
	setCoordinateActionCreatorType,
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

export const setIsFinished: setIsFinishedActionCreatorType = (value) => {
	return {
		type: "SET_IS_FINISHED",
		payload: value,
	};
};

export const setCanvasData: setCanvasDataActionCreator = (data) => {
	return {
		type: "SET_CANVAS",
		payload: data,
	};
};

export const setCoordinate: setCoordinateActionCreatorType = (x, y) => {
	return {
		type: "SET_COORDINATE",
		x,
		y,
	};
};
